import Router from "next/router";
import clsx from "clsx";
import { Space, Spin } from "antd";
import { useTimer } from "src/utils/hooks/useTimer";

const Panel = () => {
  const timer = useTimer(1);
  const redirectTimer = useTimer(500);

  if (redirectTimer) Router.replace("/panel/products");

  return (
    <div
      className={clsx("flex justify-center transition-opacity duration-500", {
        "opacity-0": !timer,
      })}
    >
      <Space direction="vertical" align="center" className="mt-32">
        <h2 level={1} className="text-blue-300 text-2xl font-semibold">
          XanderFood
        </h2>
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Panel;
