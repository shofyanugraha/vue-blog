<template>
  <nav class="nav" id="heading">
    <div class="container">
      <div class="nav-left">
        <router-link class="is-brand nav-item" to="/home"><img alt="nixinews" src="../assets/logo.png"></router-link>
      </div>
      <div class="nav-right">
          <router-link class="nav-item" to="/home">Home</router-link>
          <router-link class="nav-item" to="/category">Category</router-link>
          <router-link class="nav-item" :to="{name: 'selCategory', params: { catName: 'gadget' }}">Gadget</router-link>
          <router-link class="nav-item" :to="{name: 'selCategory', params: { catName: 'game' }}">Game</router-link>
          <router-link class="nav-item" :to="{name: 'selCategory', params: { catName: 'biz' }}">Biz</router-link>
      </div>
    </div>
  </nav>`
</template>

<script>
export default {
  name: 'heading',
  data () {
    return {
      show: false
    }
  }
}

</script>

<style lang="scss">
  .nav{
    background :#ddd;
  }
</style>