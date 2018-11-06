import { Spin } from "antd";
export default () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      zIndex: "9999",
      opacity: "0.7",
      position: "fixed",
      left: "0",
      top: "0",
      backgroundColor: "#fff",
      display: "none"
    }}
  >
    <Spin size="large" style={{ position: "fixed", left: "50%", top: "50%" }} />
  </div>
);
