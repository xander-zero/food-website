import { useRouter } from "next/router";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();

  const onFinish = (values) => {
    const { email, password } = values;
    if (email === "admin@gmail.com" && password === "admin") {
      router.push("/panel");
    } else {
      message.error("Username or Password is wrong!");
    }
  };

  return (
    <Form
      name="login"
      className="w-[100%]"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
          {
            type: "email",
            message: "Email is not valid!",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="admin@gmail.com" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="admin" />
      </Form.Item>

      <Form.Item className="mb-0 ">
        <div className="my-1 flex items-center justify-between">
          <Button htmlType="submit">Login</Button>
          <Link href="/auth/register" className="text-[12px] text-[#1890ff]">
            Register Now!
          </Link>
        </div>
      </Form.Item>
    </Form>
  );
}
