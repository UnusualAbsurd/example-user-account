import { NextApiRequest } from "next";
import { dbConnect } from "../../lib/mongodb";
import { withSessionApi } from "../../lib/session";
import { micahAvatar } from "../../lib/util";

export default withSessionApi(async (req: NextApiRequest, res) => {
  if (req.method == "POST") {
    const username = req.body["username"] as string;
    const password = req.body["password"] as string;
    const avatar = req.body["avatar"] as string;
    if (!username || !password)
      return res
        .status(400)
        .send({ message: "Invalid headers value provided." });

    const new_avatar = micahAvatar(username);

    const db = await dbConnect();
    const data = await db
      .collection("shot_users")
      .findOne({ username, password });
    if (data) {
      await db.collection("shot_users").findOneAndUpdate(
        {
          username,
        },
        {
          $set: {
            username: username ? username : data.username,
            avatar: avatar ? avatar : data.avatar,
          },
        }
      );

      req.session.user = {
        username: data.username,
        avatar: data.avatar,
        password: data.password,
      };
    }

    if (!data) {
      await db.collection("shot_users").insertOne({
        username,
        password,
        avatar: new_avatar,
      });

      req.session.user = {
        username,
        password,
        avatar: new_avatar,
      };
    }

    await req.session.save();
    res.send({ message: "Success" });
  } else if (req.method !== "POST") res.end();
});
