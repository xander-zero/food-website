import { useRouter } from "next/router";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { queryLogin } from "src/service/auth";

export function LoginForm() {
  const router = useRouter();

  const { mutate: onLogin, isLoading, data } = useMutation(queryLogin());

  const onFinish = (values) => {
    const data = { data: values };

    onLogin(data, {
      onSuccess: () => {
        router.push("/panel");
      },
    });
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
          <Button htmlType="submit" loading={isLoading}>
            Login
          </Button>
          <Link href="/auth/register" className="text-[12px] text-[#1890ff]">
            Register Now!
          </Link>
        </div>
      </Form.Item>
    </Form>
  );
}
