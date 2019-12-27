import React from 'react';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import { Form, Row, Col, Input, Select, DatePicker } from 'antd';
import { IIterationFormComponentProps } from './interfaces';
import moment from 'moment';
import { users } from '../common/consts';

class IterationForm extends React.Component<FormComponentProps> {
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
            <Form.Item label='迭代目标' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              {
                this.props.form.getFieldDecorator('target', {})(<Input.TextArea rows={5}/>)
              }
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label='迭代时间' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                {
                  this.props.form.getFieldDecorator('startTime', {
                    rules: []
                  })(<DatePicker/>)
                }
              </Form.Item>
              <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                {
                  this.props.form.getFieldDecorator('endTime', {
                    rules: []
                  })(<DatePicker/>)
                }
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label='负责人' labelCol={{span: 4}} wrapperCol={{span: 16}}>
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
        </Row>
      </Form>
    )
  }
}

const formCreateOption: FormCreateOption<IIterationFormComponentProps> = {
  mapPropsToFields (props) {
    return {
      title: Form.createFormField({value: props.iteration && props.iteration.title}),
      target: Form.createFormField({value: props.iteration && props.iteration.target}),
      leader: Form.createFormField({value: props.iteration && props.iteration.leader}),
      startTime: Form.createFormField({value: props.iteration && moment(props.iteration.startTime)}),
      endTime: Form.createFormField({value: props.iteration && moment(props.iteration.endTime)})
    }
  }
};

export default Form.create(formCreateOption)(IterationForm);