import { mdiAccount } from "@mdi/js";

import styles from "./Avatar.module.css";
import { IconButton } from "../IconButton/IconButton";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
}

export function Avatar({ username = "User", ...props }: AvatarProps) {
  return (
    <div className={styles.avatar} {...props}>
      <p>{username}</p>
      <IconButton iconPath={mdiAccount} kind="ghost" />
    </div>
  );
}
