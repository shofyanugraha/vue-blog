<template>
  <div id="pages">
    <div v-if="$route.matched.length">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pages'
}
</script>
