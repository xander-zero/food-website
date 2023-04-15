import { Modal } from "antd";

export function CustomModal({ visible, close, children }) {
  return (
    <Modal visible={visible} onCancel={close}>
      {children}
    </Modal>
  );
}
