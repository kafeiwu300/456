import { Form, Row, Col, Input, Transfer } from 'antd';
import { FormCreateOption } from 'antd/lib/form/Form';
import React from 'react';
import { ITestPlanFormComponentProps, ITestCase } from './interface';

class TestPlanForm extends React.Component<ITestPlanFormComponentProps, {selectedCaseIds: string[]}> {
  constructor (props: Readonly<ITestPlanFormComponentProps>) {
    super(props);
    this.state = {
      selectedCaseIds: this.props.initialValue && this.props.initialValue.caseIds ? this.props.initialValue.caseIds : []
    }
  }

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
            <Form.Item label='测试用例' labelCol={{span: 4}} wrapperCol={{span: 16}}>
              {
                this.props.form.getFieldDecorator('caseIds', {})(
                  <Transfer
                    onChange={(targetKeys: string[]) => {
                      this.setState({
                        selectedCaseIds: targetKeys
                      });
                    }}
                    listStyle={{width: 'calc(50% - 20px)'}}
                    dataSource={this.props.testCases.map((c: ITestCase) => ({key: c.id!, ...c, title: c.title!}))}
                    targetKeys={this.state.selectedCaseIds}
                    render={item => item.title}
                  />
                )
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

const formCreateOption: FormCreateOption<ITestPlanFormComponentProps> = {
  mapPropsToFields (props) {
    return {
      title: Form.createFormField({value: props.initialValue && props.initialValue.title}),
      caseIds: Form.createFormField({value: props.initialValue && props.initialValue.caseIds})
    }
  }
}

export default Form.create(formCreateOption)(TestPlanForm);