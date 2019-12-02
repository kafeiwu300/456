import { Form } from 'antd';
import { FormCreateOption } from 'antd/lib/form/Form';
import { IStoryFormComponentProps } from './interfaces';
import BaseForm from './BaseForm';

const formCreateOption: FormCreateOption<IStoryFormComponentProps> = {
  mapPropsToFields (props) {
    return {
      title: Form.createFormField({value: props.story && props.story.title}),
      status: Form.createFormField({value: props.story && props.story.status}),
      description: Form.createFormField({value: props.story && props.story.description}),
      priority: Form.createFormField({value: props.story && props.story.priority}),
      estimatedHours: Form.createFormField({value: props.story && props.story.estimatedHours}),
      storyPoint: Form.createFormField({value: props.story && props.story.storyPoint}),
      leader: Form.createFormField({value: props.story && props.story.leader})
    }
  }
}

export default Form.create(formCreateOption)(BaseForm);