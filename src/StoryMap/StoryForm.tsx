import { Form } from 'antd';
import { FormCreateOption } from 'antd/lib/form/Form';
import { IStoryFormComponentProps } from '../Kanban/interfaces';
import BaseForm from '../Kanban/BaseForm';

const formCreateOption: FormCreateOption<IStoryFormComponentProps> = {
  mapPropsToFields (props) {
    return {
      title: Form.createFormField({value: props.story && props.story.title}),
      state: Form.createFormField({value: props.story && props.story.state}),
      description: Form.createFormField({value: props.story && props.story.description}),
      priority: Form.createFormField({value: props.story && props.story.priority}),
      estimatedHours: Form.createFormField({value: props.story && props.story.estimatedHours}),
      storyPoint: Form.createFormField({value: props.story && props.story.storyPoint}),
      leader: Form.createFormField({value: props.story && props.story.leader})
    }
  }
}

export default Form.create(formCreateOption)(BaseForm);