import { useState } from "react";
import { addUser } from "../../api";
import styles from "./login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-#!$@%^&*_+~=:;?\/])[-\w#!$@%^&*+~=:;?\/]{8,}$/;

  const onEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const onPasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const onEmailBlur = ({ target }) => {
    setEmailError("");
    if (!emailPattern.test(target.value)) {
      setEmailError("Your email is not correct");
    }
  };

  const onPasswordBlur = ({ target }) => {
    setPasswordError("");
    if (!passwordPattern.test(target.value)) {
      setPasswordError(
        "Password has to have lowcase, uppercase letters and digits and to be not less than 8 characters"
      );
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      const res = await addUser(email, password);
      const data = await res.json();
      setEmail("");
      setPassword("");
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <form
        className={styles.form}
        action="/login"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <label className={styles.label} htmlFor="email">
          Электронная почта
        </label>
        <input
          className={styles.input}
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          type="text"
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />
        {emailError && <div className={styles.errorMessage}>{emailError}</div>}
        <label className={styles.label} htmlFor="password">
          Пароль
        </label>
        <input
          className={styles.input}
          id="password"
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
        />
        {passwordError && (
          <div className={styles.errorMessage}>{passwordError}</div>
        )}
        <button className={styles.button} type="submit" disabled={isUploading}>
          Войти
        </button>
      </form>
    </div>
  );
};
