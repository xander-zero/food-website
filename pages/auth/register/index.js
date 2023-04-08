import { AuthLayout } from "src/layout/AuthLayout";
import { RegisterForm } from "src/template/auth/Register";

export default function Register() {
  return <RegisterForm />;
}

Register.getLayout = function (page) {
  return (
    <AuthLayout
      title="Login Your Account"
      description="Please Login Your Account"
    >
      {page}
    </AuthLayout>
  );
};
