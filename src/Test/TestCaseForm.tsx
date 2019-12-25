import { Form, Row, Col, Input, Select } from 'antd';
import { FormCreateOption } from 'antd/lib/form/Form';
import React from 'react';
import { ITestCaseFormComponentProps } from './interface';
import { IStoryInfo } from '../Kanban/interfaces';

class TestCaseForm extends React.Component<ITestCaseFormComponentProps> {
  render () {
    return (
      <Form>
        <Row>
          <Col>
            <Form.Item label='标题' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              {
                this.props.form.getFieldDecorator('title', {})(<Input readOnly={this.props.readonly}/>)
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
                    <Select.Option value='Lucy' disabled={this.props.readonly}>Lucy</Select.Option>
                    <Select.Option value='Joe' disabled={this.props.readonly}>Joe</Select.Option>
                    <Select.Option value='John' disabled={this.props.readonly}>John</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='优先级' labelCol={{span: 6}} wrapperCol={{span: 10}}>
              {
                this.props.form.getFieldDecorator('level', {})(
                  <Select>
                    <Select.Option value={1} disabled={this.props.readonly}>1</Select.Option>
                    <Select.Option value={2} disabled={this.props.readonly}>2</Select.Option>
                    <Select.Option value={3} disabled={this.props.readonly}>3</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='所属故事' labelCol={{span: 8}} wrapperCol={{span: 12}}>
              {
                this.props.form.getFieldDecorator('storyId', {})(
                  <Select>
                    {
                      this.props.stories && this.props.stories.map((story: IStoryInfo) => (
                        <Select.Option value={story.id!} disabled={this.props.readonly}>{story.title}</Select.Option>
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
            <Form.Item label='前置条件' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              {
                this.props.form.getFieldDecorator('precondition', {})(<Input.TextArea rows={5} readOnly={this.props.readonly}/>)
              }
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label='步骤' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              {
                this.props.form.getFieldDecorator('procedure', {})(<Input.TextArea rows={5} readOnly={this.props.readonly}/>)
              }
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label='预期结果' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              {
                this.props.form.getFieldDecorator('expectation', {})(<Input readOnly={this.props.readonly}/>)
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

const formCreateOption: FormCreateOption<ITestCaseFormComponentProps> = {
  mapPropsToFields (props) {
    return {
      title: Form.createFormField({value: props.initialValue && props.initialValue.title}),
      procedure: Form.createFormField({value: props.initialValue && props.initialValue.procedure}),
      level: Form.createFormField({value: props.initialValue && props.initialValue.level}),
      expectation: Form.createFormField({value: props.initialValue && props.initialValue.expectation}),
      precondition: Form.createFormField({value: props.initialValue && props.initialValue.precondition}),
      leader: Form.createFormField({value: props.initialValue && props.initialValue.leader}),
      storyId: Form.createFormField({value: props.initialValue && props.initialValue.storyId})
    }
  }
}

export default Form.create(formCreateOption)(TestCaseForm);