import React from "react";
import { Form, Select, Input, InputNumber, Row, Col } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { State } from "./enums";

class BaseForm extends React.Component<FormComponentProps> {
  render () {
    const isTask = this.props.hasOwnProperty('task');
    return (
      <Form>
        <Row>
          <Col>
            <Form.Item label='标题' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              {
                this.props.form.getFieldDecorator('title', {})(<Input/>)
              }
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label='状态' labelCol={{span: 4}} wrapperCol={{span: 4}}>
              {
                this.props.form.getFieldDecorator('state', {})(
                  <Select>
                    <Select.Option value={State.todo}>todo</Select.Option>
                    <Select.Option value={State.doing}>doing</Select.Option>
                    <Select.Option value={State.test}>test</Select.Option>
                    <Select.Option value={State.deploy}>deploy</Select.Option>
                    <Select.Option value={State.done}>done</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label='描述' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              {
                this.props.form.getFieldDecorator('description', {})(<Input.TextArea rows={5}/>)
              }
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='负责人' labelCol={{span: 8}} wrapperCol={{span: 8}}>
              {
                this.props.form.getFieldDecorator('leader', {})(
                  <Select>
                    <Select.Option value='Lucy'>Lucy</Select.Option>
                    <Select.Option value='Joe'>Joe</Select.Option>
                    <Select.Option value='John'>John</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='优先级' labelCol={{span: 8}} wrapperCol={{span: 8}}>
              {
                this.props.form.getFieldDecorator('priority', {})(
                  <Select>
                    <Select.Option value='very high'>very high</Select.Option>
                    <Select.Option value='high'>high</Select.Option>
                    <Select.Option value='middle'>middle</Select.Option>
                    <Select.Option value='low'>low</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label={(isTask ? '任务' : '故事') + '点'} labelCol={{span: 8}} wrapperCol={{span: 8}}>
              {
                this.props.form.getFieldDecorator((isTask ? 'task' : 'story') + 'Point', {})(<InputNumber/>)
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='预估工时' labelCol={{span: 8}} wrapperCol={{span: 8}}>
              {
                this.props.form.getFieldDecorator('estimatedHours', {})(<InputNumber/>)
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default BaseForm;