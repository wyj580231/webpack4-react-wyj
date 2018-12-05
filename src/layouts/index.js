import { LocaleProvider } from "antd";
import "moment/locale/zh-cn";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import Top from "components/common/Top";
import { withRouter } from "react-router-dom";
import Title from "components/base/Title";
import { TransitionGroup, CSSTransition } from "react-transition-group";
export default withRouter(({ children, history }) => (
  <LocaleProvider locale={zh_CN}>
    <Title title={window.helper.getTitle(history.location.pathname).title}>
      <div id="p_common">
        <Top />
        <TransitionGroup>
          <CSSTransition
            key={history.location.pathname}
            classNames="fade"
            timeout={300}
          >
            <div id="p_comtent">{children}</div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </Title>
  </LocaleProvider>
));
