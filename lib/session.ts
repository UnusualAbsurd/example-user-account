import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";

const IronOptions: IronSessionOptions = {
  password: process.env.COOKIE_SECRET as string,
  cookieName: "shotdb-session",
  ttl: 15 * 24 * 3600,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: true,
  },
};

export function withSessionApi(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, IronOptions);
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, IronOptions);
}
