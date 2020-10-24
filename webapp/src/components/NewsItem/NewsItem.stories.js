import NewsItem from './NewsItem.vue';

export default {
  title: 'NewsItem',
  component: NewsItem,
  argTypes: {
    remove: { action: 'remove' },
    update: { action: 'update' },
  }
};


const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NewsItem },
  template: '<NewsItem @update="update" @remove="remove" v-bind="$props" />',
});


export const Default = Template.bind({});
Default.args = {
  item: {
    id: '1',
    title: 'I am a title',
    votes: 42,
  }
}
