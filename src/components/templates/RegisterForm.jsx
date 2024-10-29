import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useFormFields from "hooks/useFormFields";
import notifications from "utils/toastNotifications";
import { authService } from "services/authService";

import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    password: "",
    verifypassword: "",
  };

  const [formData, handleChange] = useFormFields(defaultValues);

  const { mutate } = useMutation({
    mutationFn: authService.registerUser,
    onSuccess: () => {
      notifications("success", "ثبت نام با موفقیت انجام شد");
      navigate("/login");
    },
    onError: (error) => {
      if (error.response.data.message === "User already exists") notifications("error", "نام کاربری تکراری است");
    },
  });

  const loginHandler = (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password || !formData.verifypassword) return notifications("error", "لطفا تمام فیلدها را پر کنید");

    if (formData.password !== formData.verifypassword) return notifications("error", "رمز عبور و تکرار آن یکسان نیست");

    mutate({
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <div className={styles.login_page_container}>
      <h1>بوت کمپ بوتواستارت</h1>
      <form onSubmit={loginHandler} className={styles.login_page_form}>
        <div className={styles.form_logo}>
          <img src="Union.svg" alt="logo" />
          <h3>فرم ثبت نام</h3>
        </div>
        <div className={styles.form_fields}>
          <input type="text" name="username" placeholder="نام کاربری" value={formData.username} onChange={handleChange} autoComplete="off" />

          <input type="password" name="password" placeholder="رمز عبور" value={formData.password} onChange={handleChange} autoComplete="off" />

          <input
            type="password"
            name="verifypassword"
            placeholder="تکرار رمز عبور"
            value={formData.verifypassword}
            onChange={handleChange}
            autoComplete="off"
          />
          <button type="submit">ثبت نام</button>
          <NavLink className={styles.register_link} to="/login">
            حساب کاربری دارید؟
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
