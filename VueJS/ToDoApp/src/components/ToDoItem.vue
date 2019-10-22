<template>
  <div>{{text}}
  <button>Edit</button>
  <button>Remove</button>
  </div>
</template>

<script>
  export default {
    props:{
      text: String,
    }
  }
</script>
