import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
import { addPatientRequest } from "../../api";
import { phoneNumberMask } from "../../constants";
import styles from "./form.module.css";

export const Form = ({ setPatientData, setMessage, setError }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      const res = await addPatientRequest({
        ...formData,
        date: Date.now(),
      });
      const { data, redirect, redirectUrl, message, error } = await res.json();
      setPatientData((prevData) => [...prevData, data]);
      setMessage(message);
      setError(error);
      setFormData({
        name: "",
        phone: "",
        description: "",
      });

      if (redirect) {
        navigate(redirectUrl);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <form
        className={styles.form}
        action="/form"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label className={styles.label} htmlFor="name">
          ФИО
        </label>
        <input
          className={styles.input}
          id="name"
          name="name"
          placeholder=""
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor="phone">
          Номер телефона
        </label>
        <MaskedInput
          className={styles.input}
          mask={phoneNumberMask}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (333) 333-33-33"
          type="tel"
          id="phone"
        />
        <label className={styles.label} htmlFor="description">
          Опишите вашу проблему
        </label>
        <textarea
          className={styles.description}
          name="description"
          id="description"
          value={formData.description}
          rows="5"
          onChange={handleChange}
        ></textarea>
        <button className={styles.button} type="submit" disabled={isUploading}>
          Отправить
        </button>
      </form>
    </div>
  );
};
