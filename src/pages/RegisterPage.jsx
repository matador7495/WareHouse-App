import { authService } from "services/authService";
import useAuthForm from "hooks/useAuthForm";
import AuthForm from "components/templates/AuthForm";

function RegisterPage() {
  const defaultValues = {
    username: "",
    password: "",
    verifypassword: "",
  };

  const { formData, handleChange, handleSubmit } = useAuthForm({
    type: "register",
    authService,
    defaultValues,
    redirectPath: "/login",
  });

  const formFields = (
    <>
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
    </>
  );

  return <AuthForm title="فرم ثبت نام" formFields={formFields} handleSubmit={handleSubmit} linkText="حساب کاربری دارید؟" linkTo="/login" />;
}

export default RegisterPage;
