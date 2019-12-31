import { Form, Row, Col, Input, Select, InputNumber } from 'antd';
import { FormCreateOption } from 'antd/lib/form/Form';
import React from 'react';
import { IStoryFormComponentProps } from '../Kanban/interfaces';
import { StoryState } from '../../enums';
import { users } from '../../common/consts';

class StoryForm extends React.Component<IStoryFormComponentProps> {
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
                      this.props.storyStatus.map((status: StoryState) => (
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
                      users.map((user: string) => <Select.Option value={user}>{user}</Select.Option>)
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
            <Form.Item label='故事点' labelCol={{span: 8}} wrapperCol={{span: 12}}>
              {
                this.props.form.getFieldDecorator('storyPoint', {})(<InputNumber/>)
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
}

const formCreateOption: FormCreateOption<IStoryFormComponentProps> = {
  mapPropsToFields (props) {
    return {
      title: Form.createFormField({value: props.initialValue && props.initialValue.title}),
      status: Form.createFormField({value: props.initialValue && props.initialValue.status}),
      description: Form.createFormField({value: props.initialValue && props.initialValue.description}),
      priority: Form.createFormField({value: props.initialValue && props.initialValue.priority}),
      estimatedHours: Form.createFormField({value: props.initialValue && props.initialValue.estimatedHours}),
      storyPoint: Form.createFormField({value: props.initialValue && props.initialValue.storyPoint}),
      leader: Form.createFormField({value: props.initialValue && props.initialValue.leader})
    }
  }
}

export default Form.create(formCreateOption)(StoryForm);