import { useEffect, useState } from "react";
import styles from "./notification.module.css";

export const Notification = ({ message, error }) => {
  const [visible, setVisible] = useState(false);
  const notificationType = error ? styles.warning : styles.success;

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timerId = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timerId);
    }
  }, [message]);

  if (!visible) return null;

  return (
    <div className={`${styles.notificationBlock} ${notificationType}`}>
      <span className={styles.notificationMessage}>{message}</span>
    </div>
  );
};
