<template>
  <nuxt-link :to="'/recipes/' + id">
    <article class="recipe">
      <div :style="{backgroundImage: 'url(' + thumbnail + ')'}" class="thumbnail" />
      <h1>{{ title }}</h1>
      <p>{{ previewText }}</p>
    </article>
  </nuxt-link>
</template>

<script>
export default {
	props: ['thumbnail', 'title', 'previewText', 'id']
}
</script>

<style scoped>

    a {
        text-decoration: none;
        color: black;
    }

  .recipe{
        box-sizing: border-box;
        width: 280px;
        padding: 8px;
        border: 1px solid #ccc;
        box-shadow: 0 2px 2px #aaa;
        margin: 10px;
    }

    .thumbnail{
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 200px;
    }
</style>
