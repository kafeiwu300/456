import { Form, Row, Col, Input, Select, InputNumber } from 'antd';
import { FormCreateOption } from 'antd/lib/form/Form';
import { ITaskFormComponentProps } from './interfaces';
import React from 'react';
import { KanbanState } from '../enums';
import { users } from '../common/consts';

class TaskForm extends React.Component<ITaskFormComponentProps> {
  render () {
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
                this.props.form.getFieldDecorator('status', {})(
                  <Select>
                    {/* <Select.Option value='待开发'>待开发</Select.Option>
                    <Select.Option value='开发中'>开发中</Select.Option>
                    <Select.Option value='测试中'>测试中</Select.Option>
                    <Select.Option value='部署中'>部署中</Select.Option>
                    <Select.Option value='已完成'>已完成</Select.Option> */}
                    {
                      this.props.taskStatus.map((status: KanbanState) => (
                        <Select.Option value={status}>{status}</Select.Option>
                      ))
                    }
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
            <Form.Item label='负责人' labelCol={{span: 8}} wrapperCol={{span: 12}}>
              {
                this.props.form.getFieldDecorator('leader', {})(
                  <Select>
                    {
                      users.map((user: string) => <Select.Option value={user}>user</Select.Option>)
                    }
                  </Select>
                )
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='优先级' labelCol={{span: 6}} wrapperCol={{span: 10}}>
              {
                this.props.form.getFieldDecorator('priority', {})(
                  <Select>
                    <Select.Option value='VeryHigh'>very high</Select.Option>
                    <Select.Option value='High'>high</Select.Option>
                    <Select.Option value='Middle'>middle</Select.Option>
                    <Select.Option value='Low'>low</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='任务点' labelCol={{span: 8}} wrapperCol={{span: 12}}>
              {
                this.props.form.getFieldDecorator('taskPoint', {})(<InputNumber/>)
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='预估工时' labelCol={{span: 7}} wrapperCol={{span: 10}}>
              {
                this.props.form.getFieldDecorator('estimatedHours', {})(<InputNumber/>)
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
};

const formCreateOption: FormCreateOption<ITaskFormComponentProps> = {
  mapPropsToFields (props) {
    return {
      title: Form.createFormField({value: props.initialValue && props.initialValue.title}),
      status: Form.createFormField({value: props.initialValue && props.initialValue.status}),
      description: Form.createFormField({value: props.initialValue && props.initialValue.description}),
      priority: Form.createFormField({value: props.initialValue && props.initialValue.priority}),
      estimatedHours: Form.createFormField({value: props.initialValue && props.initialValue.estimatedHours}),
      taskPoint: Form.createFormField({value: props.initialValue && props.initialValue.taskPoint}),
      leader: Form.createFormField({value: props.initialValue && props.initialValue.leader})
    }
  }
}

export default Form.create(formCreateOption)(TaskForm);