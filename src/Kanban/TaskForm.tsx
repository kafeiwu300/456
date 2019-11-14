import { Form } from 'antd';
import { FormCreateOption } from 'antd/lib/form/Form';
import { ITaskFormComponentProps } from '../interfaces';
import BaseForm from './BaseForm';

const formCreateOption: FormCreateOption<ITaskFormComponentProps> = {
  mapPropsToFields (props) {
    return {
      title: Form.createFormField({value: props.task && props.task.title}),
      state: Form.createFormField({value: props.task && props.task.state}),
      description: Form.createFormField({value: props.task && props.task.description}),
      priority: Form.createFormField({value: props.task && props.task.priority}),
      estimatedHours: Form.createFormField({value: props.task && props.task.estimatedHours}),
      taskPoint: Form.createFormField({value: props.task && props.task.taskPoint}),
      leader: Form.createFormField({value: props.task && props.task.leader})
    }
  }
}

export default Form.create(formCreateOption)(BaseForm);