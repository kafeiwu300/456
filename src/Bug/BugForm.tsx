import React from "react";
import { Form, Select, Input, InputNumber, Row, Col } from "antd";
import { FormComponentProps, FormCreateOption } from "antd/lib/form";
import { IBugFormComponentProps } from "./interfaces";

class BugForm extends React.Component<FormComponentProps> {
  render() {
    return (
      <Form>
        <Row>
          <Col>
            <Form.Item
              label="标题"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
            >
              {this.props.form.getFieldDecorator("title", {})(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              label="状态"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 4 }}
            >
              {this.props.form.getFieldDecorator(
                "status",
                {}
              )(
                <Select>
                  <Select.Option value="to-be-acknowledged">
                    To be Acknowledged
                  </Select.Option>
                  <Select.Option value="to-be-fixed">To be fixed</Select.Option>
                  <Select.Option value="fixing">Fixing</Select.Option>
                  <Select.Option value="to-be-accepted">
                    To be accepted
                  </Select.Option>
                  <Select.Option value="accepted">Accepted</Select.Option>
                  <Select.Option value="closed">Closed</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              label="描述"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
            >
              {this.props.form.getFieldDecorator(
                "description",
                {}
              )(<Input.TextArea rows={5} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="负责人"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              {this.props.form.getFieldDecorator(
                "leader",
                {}
              )(
                <Select>
                  <Select.Option value="Lucy">Lucy</Select.Option>
                  <Select.Option value="Joe">Joe</Select.Option>
                  <Select.Option value="John">John</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="优先级"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              {this.props.form.getFieldDecorator(
                "level",
                {}
              )(
                <Select>
                  <Select.Option value="very high">very high</Select.Option>
                  <Select.Option value="high">high</Select.Option>
                  <Select.Option value="middle">middle</Select.Option>
                  <Select.Option value="low">low</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="预估工时"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              {this.props.form.getFieldDecorator(
                "estimatedHours",
                {}
              )(<InputNumber />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const formCreateOption: FormCreateOption<IBugFormComponentProps> = {
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({ value: props.bug && props.bug.title }),
      status: Form.createFormField({ value: props.bug && props.bug.status }),
      description: Form.createFormField({
        value: props.bug && props.bug.description
      }),
      level: Form.createFormField({ value: props.bug && props.bug.level }),
      estimatedHours: Form.createFormField({
        value: props.bug && props.bug.estimatedHours
      }),
      leader: Form.createFormField({ value: props.bug && props.bug.leader })
    };
  }
};

export default Form.create(formCreateOption)(BugForm);
