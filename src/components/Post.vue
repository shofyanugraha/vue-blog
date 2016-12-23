<template>
  <div id="home">
    <div class="container">
      <div class="columns">
        <div class="column is-two-third content">
          <div class="box">
            <h1 class="title is-2">{{ mainContent.title }}</h1>
            <div class="sub-title meta">Posted by {{ mainContent.writer.full_name}} at {{ moment(mainContent.created_at).fromNow() }}</div>
            <div class="content">
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
          <div class="widget">
            <div class="widget-title">What's New</div>
            <div v-if="articles.length > 0">
            <article class="media" v-for="article in articles">
              <div class="media-left" href="#">
                <router-link  :to="{name: 'showPost', params: { slug: article.slug }}">
                  <figure class="image is-64x64">
                    <router-link :to="{name: 'showPost', params: { slug: article.slug }}">
                     <div v-if="article.type == 'video' ">
                        <img :src="article.content.hd" alt="">
                      </div>
                      <div v-else>
                        <img :src="article.content.square500" alt="">
                      </div>
                    </router-link>
                  </figure>
                </router-link>
              </div>
              <div class="media-content">
                  <h3 class="title is-5">
                    <router-link :to="{name: 'showPost', params: { slug: article.slug }}">{{ article.title }}</router-link>
                  </h3>
                  <div class="content">
                  <small>Posted by {{ article.writer.full_name }}  at {{ moment(article.created_at).fromNow() }}</small>
                  </div>
              </div>
            </article>
            </div>
            <div class="empty" v-else>
              <div class="media">
                <div class="media-left" href="#">
                    <figure class="image is-64x64">
                    </figure>
                </div>
                <div class="media-content">
                    <h3 class="title is-5">
                      
                    </h3>
                    <div class="meta">
                    </div>
                </div>
              </div>
              <div class="media">
                <div class="media-left" href="#">
                    <figure class="image is-64x64">
                    </figure>
                </div>
                <div class="media-content">
                    <h3 class="title is-5">
                      
                    </h3>
                    <div class="meta">
                    </div>
                </div>
              </div>
              <div class="media">
                <div class="media-left" href="#">
                    <figure class="image is-64x64">
                    </figure>
                </div>
                <div class="media-content">
                    <h3 class="title is-5">
                      
                    </h3>
                    <div class="meta">
                    </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
<script>
import Moment from 'moment'

export default {
  name: 'Post',
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
      this.$http.get('http://api.news.nixia.tech/post?filter=all&sort=latest')
      .then((response) => {
        if (response.body.meta.status === true) {
          this.articles = response.body.data
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
