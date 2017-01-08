<template>
  <div id="home">
    <div class="container">
      <div class="columns">
        <div class="column is-two-third content">
          <div class="box">
            <h1 class="title is-2">{{ mainContent.title }}</h1>
            <div class="sub-title meta">Posted by {{ mainContent.writer.full_name}} at {{ moment(mainContent.created_at).fromNow() }}</div>
            <div class="content wysiwyg">
              <div v-if="mainContent.type === 'video'" class="video-container">
                <iframe width="560" height="315" :src="generateVideoUrl(mainContent.content.key)" frameborder="0" allowfullscreen></iframe>
              </div>
              <div v-else>
                <img :src="mainContent.content.square800" alt="">
              </div>
              <div v-html="mainContent.article"></div>
            </div>
          </div>
        </div>
        <aside class="column is-one-third">
          <latest-article></latest-article>
        </aside>
      </div>
    </div>
  </div>
</template>
<script>
import Moment from 'moment'
import LatestArticle from './LatestArticle'

export default {
  name: 'Post',
  components: {
    LatestArticle
  },
  data () {
    return {
      show: false,
      articles: [],
      mainContent: {}
    }
  },
  mounted: function () {
    this.fetchStories()
  },
  methods: {
    fetchStories: function () {
      this.$http.get('http://api.news.nixia.tech/post/show?id=' + this.$route.params.slug)
      .then((response) => {
        if (response.body.meta.status === true) {
          this.mainContent = response.body.data
          console.log(response.body)
        }
      }, (response) => {
      })
    },
    reloadStories: function () {
      this.$http.get('http://api.news.nixia.tech/post/show?id=' + this.$route.params.slug)
      .then((response) => {
        if (response.body.meta.status === true) {
          this.mainContent = response.body.data
          console.log(response.body)
        }
      }, (response) => {
      })
    },
    moment: function (args) {
      return Moment(args)
    },
    setBackground: function (args) {
      if (args.content.hd) {
        return {
          backgroundImage: 'url(' + args.content.hd + ')'
        }
      }
      return
    },
    generateVideoUrl: function (args) {
      return 'https://www.youtube.com/embed/' + args
    }
  },
  watch: {
    '$route' (to, from) {
      this.reloadStories()
    }
  }
}
</script>
<style lang="scss">
  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 35px;
    height: 0;
    overflow: hidden;
    iframe {
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
