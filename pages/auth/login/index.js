import { LoginForm } from "src/template/auth/Login";
import { AuthLayout } from "src/layout/AuthLayout";

export default function Login() {
  return <LoginForm />;
}

Login.getLayout = function (page) {
  return (
    <AuthLayout
      title="Login Your Account"
      description="Please Login Your Account"
    >
      {page}
    </AuthLayout>
  );
};
