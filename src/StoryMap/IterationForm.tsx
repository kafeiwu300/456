import React from 'react';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import { Form, Row, Col, Input, Select } from 'antd';
import { IIterationFormComponentProps } from './interfaces';

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
            <Form.Item label='负责人' labelCol={{span: 4}} wrapperCol={{span: 16}}>
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
      leader: Form.createFormField({value: props.iteration && props.iteration.leader})
    }
  }
};

export default Form.create(formCreateOption)(IterationForm);