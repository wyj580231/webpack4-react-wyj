import { connect } from "react-redux";
import { Checkbox, Row, Col, Icon } from "antd";
export default connect(({ toDoList }) => ({ toDoList }))(
  ({ toDoList: { list }, dispatch }) => {
    return (
      <div>
        {list
          .filter(v => !v.comoleted)
          .map(v => (
            <Row key={v.name}>
              <Col span={14} title={v.text}>
                <Checkbox
                  checked={v.completed}
                  onChange={() => {
                    v.completed = !v.completed;
                    dispatch({ type: "toDoList/save", payload: { list } });
                  }}
                >
                  {v.text}
                </Checkbox>
              </Col>
              <Col span={8}>{v.time}</Col>
              <Col span={2}>
                <Icon
                  type="close"
                  onClick={() => {
                    list = list.filter(v1 => v1.text !== v.text);
                    dispatch({ type: "toDoList/save", payload: { list } });
                  }}
                />
              </Col>
            </Row>
          ))}
      </div>
    );
  }
);
