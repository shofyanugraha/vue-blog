<template>
  <nav class="nav has-shadow" id="heading">
    <div class="container">
      <div class="nav-left">
        <router-link class="is-brand nav-item" to="/home"><img alt="nixinews" src="../assets/logo.png"></router-link>
      </div>
      <span v-bind:class="{ 'nav-toggle': true, 'is-active': show}" id="nav-toggle" @click="show = !show">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div v-bind:class="{ 'nav-right': true, 'nav-menu': true, 'is-active': show }">
          <router-link class="nav-item" to="/home">Home</router-link>
          <router-link class="nav-item" to="/category">Category</router-link>
          <router-link class="nav-item" :to="{name: 'selCategory', params: { catName: 'gadget' }}">Gadget</router-link>
          <router-link class="nav-item" :to="{name: 'selCategory', params: { catName: 'game' }}">Game</router-link>
          <router-link class="nav-item" :to="{name: 'selCategory', params: { catName: 'biz' }}">Biz</router-link>
      </div>
    </div>
  </nav>
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
    background :#00D1B2;
    margin-bottom: 20px;
    .nav-item {
      color: #fff;
    }
    .nav-menu {
      background: #00D1B2;
    }
    .nav-toggle {
      background: #22f7d7;
      span {
        background-color: #fff;
      }
    }
  }
</style>