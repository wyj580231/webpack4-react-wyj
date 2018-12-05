import { LocaleProvider } from "antd";
import "moment/locale/zh-cn";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import Top from "../components/common/Top";
import { withRouter } from "react-router-dom";
import Title from "../components/base/Title";
export default withRouter(({ children, history }) => (
  <LocaleProvider locale={zh_CN}>
    <Title title={window.helper.getTitle(history.location.pathname).title}>
      <div id="p_common">
        <Top />
        <div id="p_comtent">{children}</div>
      </div>
    </Title>
  </LocaleProvider>
));
