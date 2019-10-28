<template>
<div class="inputContainer" style="display:right">
  <input
    type="text"
    placeholder="New todo"
    :value="value"
    v-on="listeners"
  >
  <span class="space"></span>
  <span class="buttonContainer">
    <a v-on="listeners">
    <img title="Add" class="icon" src="../assets/add.png" />
          </a>
         </span> 
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  computed: {
    listeners () {   /*  https://codesandbox.io/s/o29j95wx9 */
      return {
      
        ...this.$listeners, 
      
        input: event => this.$emit('input', event.target.value),

      
      }
    }
  }
}
</script>
<style scoped>
.inputContainer {
  
  margin-bottom: 20px;
 
  display: flex;
 width: 30%;
}
</style>