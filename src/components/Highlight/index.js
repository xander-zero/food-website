import Highlighter from "react-highlight-words";

export default function Highlight({ highlightStyle = {}, ...props } = {}) {
  return (
    <Highlighter
      highlightStyle={{
        backgroundColor: "#ffc069",
        border: "1px solid",
        padding: 0,
        ...highlightStyle,
      }}
      {...props}
    />
  );
}
