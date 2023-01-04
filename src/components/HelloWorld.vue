<template>
  <div class="hello">
    <p>X座標: {{ coords.data.latitude }}</p>
    <p>Y座標: {{ coords.data.longitude }}</p>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'

export default {
  name: 'HelloWorld',
  setup () {
    const coords = reactive({
      data: {
        latitude: null,
        longitude: null
      }
    })

    onMounted(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          coords.data.latitude = position.coords.latitude
          coords.data.longitude = position.coords.longitude
        })
      } else {
        console.log('你的瀏覽器不支援地理定位。')
      }
    })

    return {
      coords
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
