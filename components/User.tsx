import { User } from "../typings/typings";
import styles from "../styles/User.module.scss";
import Link from "next/link";

interface Props {
  user: User;
}

export default function UserBox({ user }: Props) {
  return (
    <>
      <div className={styles.center_screen}>
        <div className={styles.box}>
          <h1 className={styles.title}>{user.username}</h1>
          <div className={styles.user_info_div}>
            <img
              src={user.avatar}
              alt="User Avatar"
              height={64}
              width={64}
              style={{ borderRadius: "9999px" }}
            />
            <br />
            <div>
              <Link href={"/api/logout"} passHref>
                <button className={styles.logout}>Logout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
