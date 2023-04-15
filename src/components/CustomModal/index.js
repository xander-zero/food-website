import { Modal } from "antd";

export function CustomModal({ visible, close, children, onOk }) {
  return (
    <Modal visible={visible} onCancel={close} onOk={onOk}>
      {children}
    </Modal>
  );
}
