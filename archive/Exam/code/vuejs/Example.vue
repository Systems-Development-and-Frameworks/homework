<template>
  <div>
    <!-- Hier kann das <input> Feld eingefügt werden -->


    <p>
      {{ message }}
    </p>
    <button>
      Click me
    </button>
    <p>
      {{ exclaimedMessage }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello'
    }
  },
  computed: {
    // Hier kann die computed property namens `exclaimedMessage` implementiert
    // werden








  },
  methods: {
    handleClick() {
      this.message = this.message.split('').reverse().join('')
    },
  },
}
</script>
