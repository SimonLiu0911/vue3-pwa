<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <br>
    <button @click="A2HS">install</button>
  </nav>
  <router-view />
</template>

<script>
import { reactive, onMounted } from 'vue'

export default {
  name: 'App',
  setup () {
    const states = reactive({
      deferredPrompt: null
    })

    const A2HS = () => {
      if (states.deferredPrompt) {
        states.deferredPrompt.prompt()
        states.deferredPrompt = null
      }
    }
    onMounted(() => {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault()

        states.deferredPrompt = e
      })

      window.addEventListener('appinstalled', () => {
        states.deferredPrompt = null
      })

      // document.querySelector('#app').addEventListener('click', () => {
      //   if (states.deferredPrompt) {
      //     states.deferredPrompt.prompt()
      //     states.deferredPrompt = null
      //   }
      // })
    })

    return {
      A2HS
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
