import { useRouter } from "next/router";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { queryRegister } from "src/service/auth";

export function RegisterForm() {
  const router = useRouter();

  const { mutate: onRegister, isLoading } = useMutation(queryRegister());

  const onFinish = (values) => {
    const data = { data: values };
    onRegister(data, {
      onSuccess: () => router.push("/auth/login"),
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
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>
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
        <Input prefix={<MailOutlined />} placeholder="email" />
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
        <Input.Password prefix={<LockOutlined />} placeholder="password" />
      </Form.Item>

      <Form.Item className="mb-0 ">
        <div className="my-1 flex items-center justify-between">
          <Button htmlType="submit" loading={isLoading}>
            Register
          </Button>
          <Link href="/auth/register" className="text-[12px] text-[#1890ff]">
            Login Now
          </Link>
        </div>
      </Form.Item>
    </Form>
  );
}
