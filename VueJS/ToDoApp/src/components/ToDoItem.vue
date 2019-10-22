<template>
  <div>
    {{todo.text}}
    <button>Edit</button>
    <button>Remove</button>
  </div>
</template>

<script>
  export default {
    props:{
      todo: {
        text: String
      },
    }
  }
</script>
