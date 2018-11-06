import styles from "./404.scss";
export default () => {
  return (
    <div>
      <div className={styles.code}>404</div>
      <div className={styles.notice}>您请求的地址不存在.</div>
    </div>
  );
};
