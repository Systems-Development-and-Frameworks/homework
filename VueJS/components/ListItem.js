export default Vue.component('list-item', {
  template: '<li>{{item.text}}</li>',
  props: ['item']
})
