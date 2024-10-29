import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useFormFields from "hooks/useFormFields";
import notifications from "utils/toastNotifications";
import { authService } from "services/authService";
import { setCookie } from "utils/cookie";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    password: "",
  };

  const [formData, handleChange] = useFormFields(defaultValues);

  const { mutate } = useMutation({
    mutationFn: authService.loginUser,
    onSuccess: (data) => {
      setCookie("token", data.data.token);
      notifications("success", "ورود با موفقیت انجام شد");
      navigate("/");
    },
    onError: (error) => {
      if (error.response.data.message === "Invalid credentials") notifications("error", "نام کاربری یا رمز عبور اشتباه است");
    },
  });

  const loginHandler = (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) return notifications("error", "لطفاً نام کاربری و رمز عبور خود را وارد کنید");
    mutate(formData);
  };

  return (
    <div className={styles.login_page_container}>
      <h1>بوت کمپ بوتواستارت</h1>
      <form onSubmit={loginHandler} className={styles.login_page_form}>
        <div className={styles.form_logo}>
          <img src="Union.svg" alt="logo" />
          <h3>فرم ورود</h3>
        </div>
        <div className={styles.form_fields}>
          <input type="text" name="username" placeholder="نام کاربری" value={formData.username} onChange={handleChange} autoComplete="off" />
          <input type="password" name="password" placeholder="رمز عبور" value={formData.password} onChange={handleChange} autoComplete="off" />
          <button type="submit">ورود</button>
          <NavLink className={styles.register_link} to="/register">
            ایجاد حساب کاربری!
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
