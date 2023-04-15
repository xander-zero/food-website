import { Button, Form, Input, Select, Tag } from "antd";
import { LIST_ROLE, LIST_ROLE_INFO } from "src/constants/user";

export function AddUserModal({ setForm }) {
  return (
    <Form layout="vertical" className="gap-1" ref={setForm}>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: "please enter your first name",
          },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: "please enter your last name",
          },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "please enter your email",
          },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Role"
        name="isAdmin"
        rules={[
          {
            required: true,
            message: "please enter your role",
          },
        ]}
      >
        <Select>
          {LIST_ROLE.map((itm) => (
            <Select.Option
              key={itm}
              value={LIST_ROLE_INFO[itm].label === "Admin" ? true : false}
            >
              <Tag color={LIST_ROLE_INFO[itm].color}>
                {LIST_ROLE_INFO[itm].label}
              </Tag>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
