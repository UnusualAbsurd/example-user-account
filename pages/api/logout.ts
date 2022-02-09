import { NextApiRequest } from "next";
import { withSessionApi } from "../../lib/session";

export default withSessionApi(async (req: NextApiRequest, res) => {
  await req.session.destroy();
  res.redirect("/");
});
