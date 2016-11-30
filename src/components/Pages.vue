<template>
  <content id="pages">
    <div class="container">
      <div class="columns" id="featured">
        <article class="column featured is-6">
          <div class="content-wrapper" v-bind:style="setBackground(first)">
            <div class="content">
              <h1 class="title">{{ first.title }}</h1>
              <p class="meta">Ditulis oleh {{ first.full_name }}  pada {{ moment(first.created_at).fromNow() }}</p>
            </div>
          </div>
        </article>
        <div class="column is-6" v-if="featureds.length > 0" >
          <div class="columns is-multiline">
          <article class="column is-6" v-for="(featured, index) in featureds" v-if="index != 0" >
            <div class="content-wrapper" v-bind:style="setBackground(featured)">
              <div class="content">
                <h1 class="title">{{ featured.title }}</h1>
                <p class="meta">Ditulis oleh {{ featured.writer.full_name }}  pada {{ moment(featured.created_at).fromNow() }}</p>
              </div>
            </div> 
          </article>
          </div> 
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
    .content-wrapper {
      position:relative;
      padding: 20px;
      height: 100%;
      width: 100%;
      color: #fff;
      background-position: center;
      background-size: cover;
      &:before {
        position: absolute;
        background: rgba(0,0,0, .5);
        width: 100%;
        height: 100%;
        content: "";
        left: 0;
        top: 0;
      }
      .content {
        position:relative;
        z-index: 1;
        color: #fff;
      }
      .title {
        font-size: 1.6em;
        line-height: 1.2em;
        color: #fff;
        font-weight: bold;
        margin-bottom: 0;
      }
      .meta {
        font-size: 90%;
      }
    }
    .column {
      height: 200px;
      background-position: center;
      position: relative;
      &.featured {
        height: 400px;
        .title {
          font-size: 2.4em;
        }

      }
    }
  }
</style>

