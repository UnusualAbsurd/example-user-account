import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import UserBox from "../components/User";
import { dbConnect } from "../lib/mongodb";
import { withSessionSsr } from "../lib/session";
import styles from "../styles/Home.module.scss";
import { User } from "../typings/typings";

interface Props {
  user?: User;
}

export default function Home({ user }: Props) {
  const [data, setData] = useState<User[]>();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    fetch(`${window.origin}/api/users`).then(async (response) => {
      const res = await response.json();
      setData(res);
    });
  }, []);

  return (
    <>
      <div className={styles.bottom_left}>
        <Link href="https://github.com/UnusualAbsurd" passHref>
          <p
            style={{ color: "white", fontSize: "20px" }}
            className={styles.author}
          >
            Made by UnusualAbsurd
          </p>
        </Link>
      </div>
      {user ? (
        <UserBox user={user} />
      ) : login == false ? (
        <SignUp data={data} setLogin={setLogin} />
      ) : (
        <Login data={data} setLogin={setLogin} />
      )}
    </>
  );
}

export const getServerSideProps = withSessionSsr(async function indexRoute({
  req,
}) {
  const { user } = req.session;

  return {
    props: user ? { user } : {},
  };
});
