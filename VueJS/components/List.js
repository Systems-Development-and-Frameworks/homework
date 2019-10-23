export default Vue.component('list', {
    props: ['todo'],
    template: `
        <list-item v-bind:todo=todo></list-item>
   `
})

// import list, listitem
// main() {
//     indexMainArray { todos_0, ... }
//     List var;

//     for(render einzelene listItems) {
//         ...for.
//     }
// }