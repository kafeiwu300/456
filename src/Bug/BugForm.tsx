import React, { useContext, useImperativeHandle } from "react";
import { Form, Select, Input, InputNumber, Row, Col } from "antd";
import { FormComponentProps, FormCreateOption } from "antd/lib/form";
import { IBugFormComponentProps, IBug } from "./interfaces";
import { BugState } from "../enums";
import { IProject } from "../interfaces";
import ProjectContext from "../common/contexts/ProjectContext";
import useForm from 'rc-form-hooks';

// const BugForm: React.RefForwardingComponent<Form, {form: any, bug?: IBug}> = ({form, bug}, ref) => {
//   const { getFieldDecorator } = useForm<{
//     title: string;
//     status: BugState;
//     description: string;
//     level: string;
//     leader: string;
//     estimatedHours: number;
//   }>();

//   const project = useContext(ProjectContext);

//   useImperativeHandle(ref, () => ({
//     form,
//   }));

//   return (
//     <Form ref={ref}>
//       <Row>
//         <Col>
//           <Form.Item
//             label="标题"
//             labelCol={{ span: 4 }}
//             wrapperCol={{ span: 16 }}
//           >
//             {getFieldDecorator("title", {
//               initialValue: bug && bug.title
//             })(<Input />)}
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <Form.Item
//             label="状态"
//             labelCol={{ span: 4 }}
//             wrapperCol={{ span: 4 }}
//           >
//             {getFieldDecorator(
//               "status", {
//                 initialValue: bug && bug.status
//               }
//             )(
//               <Select>
//                 <Select.Option value="to-be-acknowledged">
//                   To be Acknowledged
//                 </Select.Option>
//                 <Select.Option value="to-be-fixed">To be fixed</Select.Option>
//                 <Select.Option value="fixing">Fixing</Select.Option>
//                 <Select.Option value="to-be-accepted">
//                   To be accepted
//                 </Select.Option>
//                 <Select.Option value="accepted">Accepted</Select.Option>
//                 <Select.Option value="closed">Closed</Select.Option>
//                 {/* {
//                   project.bugStatusList!.map((value: BugState) => (
//                     <Select.Option value={value}>{value}</Select.Option>
//                   ))
//                 } */}
//               </Select>
//             )}
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <Form.Item
//             label="描述"
//             labelCol={{ span: 4 }}
//             wrapperCol={{ span: 16 }}
//           >
//             {getFieldDecorator(
//               "description", {
//                 initialValue: bug && bug.description
//               }
//             )(<Input.TextArea rows={5} />)}
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row>
//         <Col span={12}>
//           <Form.Item
//             label="负责人"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 8 }}
//           >
//             {getFieldDecorator(
//               "leader", {
//                 initialValue: bug && bug.leader
//               }
//             )(
//               <Select>
//                 <Select.Option value="Lucy">Lucy</Select.Option>
//                 <Select.Option value="Joe">Joe</Select.Option>
//                 <Select.Option value="John">John</Select.Option>
//               </Select>
//             )}
//           </Form.Item>
//         </Col>
//         <Col span={12}>
//           <Form.Item
//             label="优先级"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 8 }}
//           >
//             {getFieldDecorator(
//               "level", {
//                 initialValue: bug && bug.level
//               }
//             )(
//               <Select>
//                 <Select.Option value="very high">very high</Select.Option>
//                 <Select.Option value="high">high</Select.Option>
//                 <Select.Option value="middle">middle</Select.Option>
//                 <Select.Option value="low">low</Select.Option>
//               </Select>
//             )}
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row>
//         <Col span={12}>
//           <Form.Item
//             label="预估工时"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 8 }}
//           >
//             {getFieldDecorator(
//               "estimatedHours", {
//                 initialValue: bug && bug.estimatedHours
//               }
//             )(<InputNumber />)}
//           </Form.Item>
//         </Col>
//       </Row>
//     </Form>
//   );
// }

class BugForm extends React.Component<IBugFormComponentProps> {
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
                  {/* <Select.Option value="to-be-acknowledged">
                    To be Acknowledged
                  </Select.Option>
                  <Select.Option value="to-be-fixed">To be fixed</Select.Option>
                  <Select.Option value="fixing">Fixing</Select.Option>
                  <Select.Option value="to-be-accepted">
                    To be accepted
                  </Select.Option>
                  <Select.Option value="accepted">Accepted</Select.Option>
                  <Select.Option value="closed">Closed</Select.Option> */}
                  {
                    this.props.bugStatus.map((value: BugState) => (
                      <Select.Option value={value}>{value}</Select.Option>
                    ))
                  }
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

export default Form.create<IBugFormComponentProps>(formCreateOption)(BugForm);
// export default Form.create<IBugFormComponentProps>(formCreateOption)(React.forwardRef(BugForm));
