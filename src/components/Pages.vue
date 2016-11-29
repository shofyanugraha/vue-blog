<template>
  <content id="pages">
    <div class="container">
      <div class="columns is-multiline" id="featured">
        <article class="column featured is-6" v-bind:style="setBackground(first)">
          <h1>{{ first.title }}</h1>
              <p class="uk-article-meta">Ditulis oleh {{ first.full_name }}  pada {{ moment(first.created_at).fromNow() }}</p>
        </article>
        <div class="column is-6 columns is-multiline" v-if="featureds.length > 0" >
          <article class="column is-6" v-for="(featured, index) in featureds" v-if="index != 0" v-bind:style="setBackground(featured)">
            <div class="">
              <h1>{{ featured.title }}</h1>
              <p class="uk-article-meta">Ditulis oleh {{ featured.writer.full_name }}  pada {{ moment(featured.created_at).fromNow() }}</p>
            </div> 
          </article>
        </div>
        <div v-else class="uk-text-center uk-block uk-block-primary" id="featured">
          <h1>Belum Ada Featured Content</h1>
        </div>
      </div>
      
      <!-- <div class="uk-grid">
        <div class="uk-width-3-4" v-if="articles.length > 0" id="articles">
          <article v-for="article in articles">
            <div class="uk-panel uk-panel-box">
              <div class="uk-grid">
                <div class="uk-width-1-3">
                  <router-link :to="{ name: 'showPost', params: { slug : article.slug } }"></router-link>
                </div>
                <div class="uk-width-2-3">
                  <h1 class="uk-h2">{{ article.title }}</h1>
                  <p class="uk-article-meta">Ditulis oleh <router-link :to="{ name: 'showAuthor', params: { slug : article.writer.id } }">{{ article.writer.full_name }}</router-link>  pada {{ moment(article.created_at).fromNow() }}</p>
                </div>
              </div>
            </div> 
          </article>
        </div>
        <div class="uk-width-1-4">
          <div class="uk-block uk-block-secondary uk-text-center uk-text-contrast">
            Sidebar
          </div>
        </div>
      </div> -->
    </div>
  </content>
</template>
<script>
import Moment from 'moment'

export default {
  name: 'pages',
  data () {
    return {
      show: false,
      articles: [],
      featureds: [],
      first: {}
    }
  },
  mounted: function () {
    this.fetchStories()
  },
  methods: {
    fetchStories: function () {
      this.$http.get('http://api.news.nixia.tech/post?filter=all&sort=latest')
      .then((response) => {
        if (response.body.meta.status === true) {
          this.featureds = response.body.data
          this.first = this.featureds[0]
        }
      }, (response) => {
      })
      this.$http.get('http://api.news.nixia.tech/post')
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
  }
}
</script>
<style lang="scss">
  #featured {
    .column {
      height: 200px;
      background-position: center;
      &.featured {
        height: 400px;
      }
    }
  }
</style>

