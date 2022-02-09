import { dbConnect } from "../../lib/mongodb";
import { withSessionApi } from "../../lib/session";

export default withSessionApi(async (req, res) => {
  const db = await dbConnect();
  return res.send(
    (await await db.collection("shot_users").find({}).toArray()) ?? null
  );
});
