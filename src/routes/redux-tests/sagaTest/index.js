import { Tabs } from "antd";
import styles from "./index.scss";
import Everything from "./components/Everything";
import AddToDo from "./components/AddToDo";
import { connect } from "react-redux";
const TabPane = Tabs.TabPane;
export default connect(({ toDoList }) => ({ toDoList }))(
  ({ toDoList: { sagaTab }, dispatch }) => (
    <div className={styles.app}>
      <h2>saga demo 模拟异步延迟2s插入记录</h2>
      <Tabs
        activeKey={sagaTab}
        onTabClick={sagaTab =>
          dispatch({ type: "toDoList/save", payload: { sagaTab } })
        }
      >
        <TabPane tab="Everything" key="Everything">
          <Everything />
        </TabPane>
        <TabPane tab="AddToDo" key="AddToDo">
          <AddToDo />
        </TabPane>
      </Tabs>
    </div>
  )
);
