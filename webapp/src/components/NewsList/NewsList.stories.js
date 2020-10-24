import NewsList from './NewsList.vue';

export default {
  title: 'NewsList',
  component: NewsList,
};


const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NewsList },
  template: '<NewsList v-bind="$props" />',
});


export const Empty = Template.bind({});

export const Default = Template.bind({});
Default.args = {
  initialItems: [
    { id: '1', title: 'I am not so popular', votes: -3 },
    { id: '2', title: 'I am a popular news item', votes: 42 }
  ]
}
