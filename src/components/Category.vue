<template>
  <div id="category">
    <div class="container">
      <h1 class="title is-1">{{ upperType }} Corner</h1>
      <div class="columns">
        <div class="column is-8">
          <div class="columns is-multiline" v-if="articles.length > 0">
            <div class="column is-6" v-for="article in articles">
              <article class="card">
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
          </div>
          <div class="columns" v-else>
            <div class="column is-12">
              No Article
            </div>
          </div>
        </div>
        <div class="column is-4">
          <latest-article></latest-article>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Moment from 'moment'
import LatestArticle from './LatestArticle'

export default {
  name: 'category',
  components: {
    LatestArticle
  },
  computed: {
    upperType: function () {
      var str = this.$route.params.catName.toLowerCase()
      str = str.split(' ')
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
      }
      return str.join(' ')
    }
  },
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
      this.$http.get('http://api.news.nixia.tech/post?category=' + this.$route.params.catName)
      .then((response) => {
        if (response.body.meta.status === true && response.body.data.length > 0) {
          this.articles = response.body.data
        } else {
          this.articles = []
        }
      }, (response) => {
      })
    },
    reloadStories: function () {
      this.$http.get('http://api.news.nixia.tech/post?category=' + this.$route.params.catName)
      .then((response) => {
        if (response.body.meta.status === true && response.body.data.length > 0) {
          this.articles = response.body.data
        } else {
          this.articles = []
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
      this.reloadStories()
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
  #featured {
    margin-bottom: 20px;
    .content-wrapper {
      display:block;
      position:relative;
      padding: 20px;
      height: 100%;
      width: 100%;
      color: #fff;
      background-position: center;
      background-size: cover;
      &:before {
        position: absolute;
        background: rgba(0,0,0, .3);
        width: 100%;
        height: 100%;
        content: "";
        left: 0;
        top: 0;
        -webkit-transition: all .3s ease-in-out;
        -moz-transition: all .3s ease-in-out;
        -ms-transition: all .3s ease-in-out;
        -o-transition: all .3s ease-in-out;
        transition: all .3s ease-in-out;
      }
      &:hover:before {
        background: rgba(0,0,0, .5);
      }
      .content {
        position:absolute;
        z-index: 1;
        color: #fff;
        bottom: 20px;
      }
      .title {
        color: #fff;
        font-weight: bold;
        margin: 0;
      }
      .category {
        text-transform: uppercase;
      }
      .meta {
        font-size: 90%;
      }
    }
    &.placeholder {
      .content-wrapper:before {
        background: rgba(0,0,0,.1);
      }
    }
    .column {
      height: 220px;
      background-position: center;
      position: relative;
      &.featured {
        height: 440px;
      }
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
  @media(max-width: 1024px) {
    #featured {
      .column {
        height: 240px;
        background-position: center;
        position: relative;
        &.featured {
          height: 480px;
          .title {
            font-size: 2.4em;
          }

        }
      }
    }
  }
</style>