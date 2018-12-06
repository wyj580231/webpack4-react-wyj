import styles from "./IndexPage.scss";
import { withRouter } from "react-router-dom";
@withRouter
export default class IndexPage extends React.Component {
  render() {
    return <div className={styles.app}>Welcom To WYJ</div>;
  }
}
