import { connect } from "react-redux";
import { Checkbox, Row, Col, Icon } from "antd";
export default connect(({ toDoList }) => ({ toDoList }))(
  ({ toDoList: { list } }) => {
    return (
      <div>
        {list.map(v => (
          <Row key={v.text}>
            <Col span={14} title={v.text}>
              {v.text}
            </Col>
            <Col span={8}>{v.time}</Col>
          </Row>
        ))}
      </div>
    );
  }
);
