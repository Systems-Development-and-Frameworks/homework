import NewsForm from './NewsForm.vue';

export default {
  title: 'NewsForm',
  component: NewsForm,
  argTypes: {
    create: { action: 'create' },
  }
};


const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NewsForm },
  template: '<NewsForm @create="create" v-bind="$props" />',
});


export const Default = Template.bind({});
Default.args = {
  nextId: 5
}
