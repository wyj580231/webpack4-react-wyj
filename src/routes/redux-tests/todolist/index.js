import { Tabs } from "antd";
import styles from "./index.scss";
import Everything from "./components/Everything";
import Processing from "./components/Processing";
import Completed from "./components/Completed";
import AddToDo from "./components/AddToDo";
const TabPane = Tabs.TabPane;
export default () => (
  <div className={styles.app}>
    <h2>todolist demo</h2>
    <Tabs>
      <TabPane tab="Everything" key="Everything">
        <Everything />
      </TabPane>
      <TabPane tab="Processing" key="Processing">
        <Processing />
      </TabPane>
      <TabPane tab="Completed" key="Completed">
        <Completed />
      </TabPane>
      <TabPane tab="AddToDo" key="AddToDo">
        <AddToDo />
      </TabPane>
    </Tabs>
  </div>
);
