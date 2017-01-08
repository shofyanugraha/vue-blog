<template>
  <div id="latest-article">
      <div class="title">What's New</div>
      <aside class="sidebar" >
          <article class="media" v-for="article in articles">
              <figure class="media-left">
                <router-link :to="{name: 'showPost', params: { slug: article.slug }}">
                <p v-if="article.type == 'video' " class="image is-64x64">
                  <img :src="article.content.hd" alt="">
                </p>
                <p v-else class="image is-64x64">
                  <img :src="article.content.square800" alt="">
                </p>
                </router-link>
              </figure>
            <div class="media-content">
              <h3 class="title is-5"><router-link :to="{name: 'showPost', params: { slug: article.slug }}">{{ article.title }}</router-link></h3>
              <small class="meta">Posted by {{ article.writer.full_name}} at {{ moment(article.created_at).fromNow() }}</small>
            </div>
          </article>
      </aside>
    </div>
</template>
<script>
import Moment from 'moment'

export default {
  name: 'latest-article',
  data () {
    return {
      show: false,
      articles: [],
      categories: [],
      featureds: [],
      business: {},
      games: {},
      gadgets: {},
      lifestyles: {},
      first: {}
    }
  },
  mounted: function () {
    this.fetchStories()
  },
  methods: {
    fetchStories: function () {
      this.$http.get('http://api.news.nixia.tech/post?filter=publish&sort=latest&offset=5')
      .then((response) => {
        if (response.body.meta.status === true && response.body.data.length > 0) {
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
    },
    setImage: function (args) {
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
  .widget-title {
      font-weight:bold;
      font-size: .9em;
      margin-bottom: .5em;
      display:inline-block;
    }
  .card {
    width: auto;
    margin-bottom: 20px;
    .title {
      margin-bottom: 0;
    }
    .media:not(:last-child) {
      margin-bottom:.3em;
    }
  }
  .widget {
    .widget-title {
      font-size: 1.2em;
      margin-bottom: .5em;
    }
    .media {
      .title  {
        line-height: 1.3em;
        margin-bottom:0;
      }
    }
  }
  .empty {
    .image {
      background: #ddd;
    }
    .title {
      display:block;
      background: #ddd;
      height: 1em;
      margin-bottom: 10px !important;
    }
    .widget-title {
      display:block;
      background: #ddd;
      height: 1.2em;
      margin-bottom: .7em;
      width: 40%;
    }
    .meta {
      width: 80%;
      height: 1em;
      background: #ddd;
    }
  }
  .title.is-5 {
    margin-bottom: 0;
  }
</style>

