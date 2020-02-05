<template>
  <section class="recipes">
    <Recipe
      v-for="recipe in recipes"
      :key="recipe.id"
      :thumbnail="recipe.thumbnail"
      :title="recipe.title"
      :previewText="recipe.previewText"
      :id="recipe.id"
    />
  </section>
</template>

<script>
import Recipe from '@/components/Recipe'
export default {
	components: {
		Recipe
	},
	middleware: ['isAuth'],
	asyncData () {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					recipes: [
						{
							id: '1',
							title: 'Nice',
							previewText: 'Even Nicer',
							thumbnail: 'https://www.aljazeera.com/mritems/imagecache/mbdxxlarge/mritems/Images/2019/12/19/7c97e4730a334776bbb418bed4d563f2_18.jpg'
						},
						{
							id: '2',
							title: 'Noice',
							previewText: 'Even Noicer',
							thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/800px-Donald_Trump_official_portrait.jpg'
						}
				    ]
				})
			})
		})
	}
}
</script>

<style scoped>
    .recipes{
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
    }
</style>
