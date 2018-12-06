import styles from "./Top.scss";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
const SubMenu = Menu.SubMenu;
class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.history.location.pathname
    };
  }

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
          <Menu.Item key="/">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="/404">
            <NavLink to="/404">404</NavLink>
          </Menu.Item>
          <SubMenu title={<span>redux</span>}>
            <Menu.Item key="/redux/todolist">
              <NavLink to="/redux/todolist">todolist</NavLink>
            </Menu.Item>
            <Menu.Item key="/redux/saga">
              <NavLink to="/redux/saga">saga</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default withRouter(Top);
