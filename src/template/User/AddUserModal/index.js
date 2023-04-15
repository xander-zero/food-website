import { Form, Input } from "antd";

export function AddUserModal() {
  return (
    <Form layout="vertical">
      <Form.Item label="First Name" name="firstName">
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName">
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>
    </Form>
  );
}
