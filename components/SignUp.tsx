import styles from "../styles/SignUp.module.scss";
import {
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
  useState,
} from "react";
import animation from "../styles/Animations.module.scss";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { User } from "../typings/typings";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

interface BarsData {
  title: string;
  placeholder: string;
  id: string;
  setValue: Dispatch<SetStateAction<string>>;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
}

function Bar({ title, placeholder, id, setValue, type, maxLength }: BarsData) {
  return (
    <div className={styles.bar}>
      <p className={styles.form_title}>{title}</p>
      <div className={styles.bar_input}>
        <input
          id={id}
          placeholder={placeholder}
          className={styles.input}
          onChange={(e) => setValue(e.target.value)}
          type={type ? type : "text"}
          maxLength={
            type == "password" ? 30 : maxLength ? maxLength : undefined
          }
        />
      </div>
    </div>
  );
}

interface SignUpProps {
  data?: User[];
  setLogin: Dispatch<SetStateAction<boolean>>;
}

export default function SignUp({ data, setLogin }: SignUpProps) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className={styles.center_screen}>
      <div className={styles.box}>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.forms}>
          <div>
            <Bar
              title="Username"
              placeholder="Enter your new username"
              id="username"
              setValue={setUsername}
              maxLength={25}
            />
            <Bar
              title="Password"
              placeholder="Your new password"
              id="username"
              setValue={setPassword}
              type={hidePassword == true ? "password" : "text"}
            />
            <Image
              src={hidePassword == true ? "/hidden.png" : "/eye.png"}
              alt="Eye open"
              width={20}
              height={20}
              onClick={() => {
                if (hidePassword == false) setHidePassword(true);
                if (hidePassword == true) setHidePassword(false);
              }}
            />
          </div>
          <br />
          <div className={styles.box_bottom}>
            <button
              className={styles.create}
              onClick={(e) => {
                if (!username)
                  return NotificationManager.warning(
                    "You need to provide a valid username!"
                  );
                if (!password)
                  return NotificationManager.warning(
                    "You need to provide a valid password!"
                  );

                if (data?.find((user) => user.username == username))
                  return NotificationManager.warning(
                    `A user already has that username`
                  );

                setCreating(true);

                axios.post(`/api/user`, {
                  username,
                  password,
                });

                setTimeout(() => {
                  setCreating(false);
                  router.reload();
                }, 2500);
              }}
            >
              {creating == true ? (
                <div className={animation.dot_pulse}></div>
              ) : (
                "Create Account"
              )}
            </button>
            <p className={styles.login} onClick={() => setLogin(true)}>
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
