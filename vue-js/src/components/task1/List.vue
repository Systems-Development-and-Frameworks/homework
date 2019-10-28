<template>
  <div id="list">
	<h3>{{headline}}</h3>
	<ol>
      <list-item v-for="item in ToDoList"
                 v-bind:item='item'
                 v-bind:key='item.id'
                 v-on:delete-item="deleteThisItem(item.id)">
      </list-item>
	</ol>
  </div>
</template>

<script>
import ListItem from "./ListItem" 

export default {
  name: "List",
  components: {
    "list-item" : ListItem
  },
  data: function() {
	return {
      headline: "ToDo-List",
      ToDoList: [
        {id: 0 , text: 'Clean room'},
        {id: 1 , text: 'Finish task1'},
        {id: 2 , text: 'Add task2'}
      ]
    }
  },
  methods: {
    deleteThisItem: function(index) {
      this.ToDoList.splice(index, 1);
    }
  }
}
</script>