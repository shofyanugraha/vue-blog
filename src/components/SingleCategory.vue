<template>
  <div id="single-category">
      <div class="title is-4">{{ upperType }} Corner</div>
          <div v-if="articles.length > 0">
            <article class="card" v-for="article in articles">
              <div class="card-image">
                <figure class="image is-16by9">
                  <router-link :to="{name: 'showPost', params: { slug: article.slug }}">
                  <p v-if="article.type == 'video'">
                    <img :src="article.content.hd" alt="">
                  </p>
                  <p v-else>
                    <img :src="article.content.square800" alt="">
                  </p>
                  </router-link>
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <h3 class="title is-5"><router-link :to="{name: 'showPost', params: { slug: article.slug }}">{{ article.title }}</router-link></h3>
                    <small class="meta">Posted by {{ article.writer.full_name}} at {{ moment(article.created_at).fromNow() }}</small>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div v-else>
            <article class="card empty">
              <div class="card-image">
                <figure class="image is-16by9">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <h3 class="title is-5"></h3>
                    <small class="meta"></small>
                  </div>
                </div>
              </div>
            </article>
          </div>
    </div>
</template>
<script>
import Moment from 'moment'

export default {
  name: 'single-category',
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
  props: ['type'],
  mounted: function () {
    this.fetchStories()
  },
  computed: {
    upperType: function () {
      var str = this.type.toLowerCase()
      str = str.split(' ')
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
      }
      return str.join(' ')
    }
  },
  methods: {
    fetchStories: function () {
      this.$http.get('http://api.news.nixia.tech/post?filter=publish&category=' + this.type + '&sort=latest&offset=1')
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
  },
  watch: {
    '$route' (to, from) {
      this.fetchStories()
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

