import React from "react";
import { Form, Select, Input, InputNumber } from "antd";
import { FormComponentProps } from "antd/lib/form";

class BaseForm extends React.Component<FormComponentProps> {
  render () {
    const isTask = this.props.hasOwnProperty('task');
    return (
      <Form>
        <Form.Item label='标题' labelCol={{span: 4}} wrapperCol={{span: 16}}>
          {
            this.props.form.getFieldDecorator('title', {})(<Input/>)
          }
        </Form.Item>
        <Form.Item label='状态' labelCol={{span: 4}} wrapperCol={{span: 4}}>
          {
            this.props.form.getFieldDecorator('state', {})(
              <Select>
                <Select.Option value='todo'>todo</Select.Option>
                <Select.Option value='doing'>doing</Select.Option>
                <Select.Option value='done'>done</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label='描述' labelCol={{span: 4}} wrapperCol={{span: 16}}>
          {
            this.props.form.getFieldDecorator('description', {})(<Input.TextArea rows={5}/>)
          }
        </Form.Item>
        <Form.Item label='负责人' labelCol={{span: 4}} wrapperCol={{span: 4}}>
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
        <Form.Item label='优先级' labelCol={{span: 4}} wrapperCol={{span: 16}}>
          {
            this.props.form.getFieldDecorator('priority', {})(<InputNumber/>)
          }
        </Form.Item>
        <Form.Item label={(isTask ? '任务' : '故事') + '点'} labelCol={{span: 4}} wrapperCol={{span: 16}}>
          {
            this.props.form.getFieldDecorator((isTask ? 'task' : 'story') + 'Point', {})(<InputNumber/>)
          }
        </Form.Item>
        <Form.Item label='预估工时' labelCol={{span: 4}} wrapperCol={{span: 16}}>
          {
            this.props.form.getFieldDecorator('estimatedHours', {})(<InputNumber/>)
          }
        </Form.Item>
      </Form>
    )
  }
}

export default BaseForm;