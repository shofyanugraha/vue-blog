<template>
  <div id="home">
    <div class="container">
      <div class="columns">
        <div class="column is-two-third content">
          <div class="box">
            <div class="content">
              <h1 class="title is-1">{{ mainContent.title }}</h1>
              
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
                     <img src="http://placehold.it/128x128" alt="Image">
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
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchStories()
    }
  }
}
</script>
