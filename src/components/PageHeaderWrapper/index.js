import { PageHeader } from "antd";

export function PageHeaderWrapper({ title, icon, children, ...props }) {
  return (
    <PageHeader
      {...props}
      title={
        title || icon ? (
          <h3 style={{ margin: 0 }}>
            {icon} {title}
          </h3>
        ) : null
      }
    >
      <div className="pb-9">{children}</div>
    </PageHeader>
  );
}
