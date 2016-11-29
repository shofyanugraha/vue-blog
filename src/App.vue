<template>
  <div class="app">
    <nprogress-container></nprogress-container>
    <heading></heading>
    <pages></pages>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

import Heading from './components/Heading'
import Pages from './components/Pages'

export default {
  name: 'app',
  components: {
    Heading,
    Pages,
    NprogressContainer
  },
  watch: {
    isAttached: function () {
    }
  }
}
</script>
<style lang="scss">
@import "~bulma";
@import '~animate.css';
.animated {
  animation-duration: .377s;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;
  #nprogress {
    $color: #48e79a;
    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }
    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}

</style>