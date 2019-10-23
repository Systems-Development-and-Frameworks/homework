export default Vue.component('list', {
    props: ['todo'],
    template: `
        <div class="list">        
            <list-item :todo=todo></list-item>
        </div>
    `
})
