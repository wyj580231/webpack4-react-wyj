import { LocaleProvider } from "antd";
import "moment/locale/zh-cn";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import Top from "../components/common/Top";
export default ({ children }) => (
  <LocaleProvider locale={zh_CN}>
    <div id="p_common">
      <Top />
      <div id="p_comtent">{children}</div>
    </div>
  </LocaleProvider>
);
