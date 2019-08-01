import { Form, Button, Input, DatePicker } from "antd";
import { connect } from "react-redux";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};
export default connect(({ toDoList }) => ({ toDoList }))(
  Form.create()(
    ({
      toDoList: { list },
      form: { getFieldDecorator, validateFields, resetFields },
      dispatch
    }) => {
      const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
          if (!err) {
            const text = values.text,
              time = values.time.format("YYYY-MM-DD HH:mm:ss");
            dispatch({
              type: "toDoList/save",
              payload: { sagaTab: "Everything" }
            });
            dispatch({
              type: "toDoList/sagaTest",
              payload: { item: { text, time, completed: false } }
            }).then(value =>
              console.log(
                "convert dispatch effect return promise,return value: " + value
              )
            );
            resetFields();
          }
        });
      };
      const textValidator = (rule, value, callback) => {
        if (value && list.some(v => v.text === value)) {
          callback("text already exists");
        } else {
          callback();
        }
      };
      return (
        <div>
          <Form onSubmit={handleSubmit}>
            <FormItem {...formItemLayout} label="text">
              {getFieldDecorator("text", {
                rules: [
                  { required: true, message: "please input text" },
                  {
                    validator: textValidator
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="time">
              {getFieldDecorator("time", {
                rules: [{ required: true, message: "please select time" }]
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
            <FormItem
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 }
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
        </div>
      );
    }
  )
);
