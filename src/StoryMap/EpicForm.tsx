import React from 'react';
import { FormComponentProps, FormCreateOption } from 'antd/lib/form';
import { Form, Row, Col, Input } from 'antd';
import { IEpicFormComponentProps } from './interfaces';

class EpicForm extends React.Component<FormComponentProps> {
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
            <Form.Item label='描述' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              {
                this.props.form.getFieldDecorator('description', {})(<Input.TextArea rows={5}/>)
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

const formCreateOption: FormCreateOption<IEpicFormComponentProps> = {
  mapPropsToFields (props) {
    return {
      title: Form.createFormField({value: props.epic && props.epic.title}),
      description: Form.createFormField({value: props.epic && props.epic.description})
    }
  }
};

export default Form.create(formCreateOption)(EpicForm);