<template>
  <div id="pages">
    <transition :name="transitionName" v-if="$route.matched.length">
	  <router-view></router-view>
	</transition>
  </div>
</template>
<script>
export default {
  name: 'pages',
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>
