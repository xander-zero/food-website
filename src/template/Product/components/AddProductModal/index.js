import { Form, Input, Select, Tag } from "antd";
import { LIST_STOCK, LIST_STOCK_INFO } from "src/constants/product";

export function AddProductModal({ setForm, productData, form }) {
  return (
    <Form
      layout="vertical"
      className="gap-1"
      ref={setForm}
      initialValues={productData ?? ""}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "please enter your title",
          },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: "please enter your price",
          },
        ]}
      >
        <Input placeholder="Price" />
      </Form.Item>
      <Form.Item
        label="Stock"
        name="isStock"
        rules={[
          {
            required: true,
            message: "please enter your stock",
          },
        ]}
      >
        <Select>
          {LIST_STOCK.map((itm) => (
            <Select.Option
              key={itm}
              value={LIST_STOCK_INFO[itm].label === "Admin" ? true : false}
            >
              <Tag color={LIST_STOCK_INFO[itm].color}>
                {LIST_STOCK_INFO[itm].label}
              </Tag>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
