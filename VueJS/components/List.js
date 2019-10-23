export default Vue.component('list', {
    props: ['todo'],
    template: `
        <div class="list">
        
            <list-item :content=todo></list-item>
        </div>
    `
})
