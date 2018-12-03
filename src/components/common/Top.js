import styles from "./Top.scss";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
export default class extends React.Component {
  state = {
    current: "home"
  };
  render() {
    let { current } = this.state;
    return (
      <div className={styles.top}>
        <Menu
          selectedKeys={[current]}
          mode="horizontal"
          onClick={e =>
            this.setState({
              current: e.key
            })
          }
        >
          <Menu.Item key="home">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="404">
            <NavLink to="/404">404</NavLink>
          </Menu.Item>
          <SubMenu title={<span>redux</span>}>
            <Menu.Item key="reduxtest">
              <NavLink to="/redux/test">test</NavLink>
            </Menu.Item>
            <Menu.Item key="reduxsaga">
              <NavLink to="/redux/saga">saga</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
