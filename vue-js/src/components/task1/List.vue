  <template>
  <div id="list">
	<h3>{{headline}}</h3>
	<ul>
      <list-item v-for="(item, index) in ToDoList"
                 v-bind:item='item'
                 v-bind:key=index
                 v-on:delete-item="deleteThisItem(index)">
      </list-item>
      
	</ul>
  <div id="add">
        <input id="add-item-text" />
        <button v-on:click="addText">Add</button>
  </div>
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
        {text: 'Clean room'},
        {text: 'Finish task1'},
        { text: 'Add task2'}
      ]
    }
  },
  methods: {
    deleteThisItem: function(index) {
      this.ToDoList.splice(index, 1);
    },
    addText: function(){
      this.ToDoList.push({
        text:  document.getElementById("add-item-text").value
      });
      document.getElementById("add-item-text").value = "";
    }
  }
}
</script>

<style>
ul {
  list-style-type: square;
}

#add {
  text-align: left;
  margin-left: 20px;
}
</style>