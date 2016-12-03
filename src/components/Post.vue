<template>
  <div id="home">
    <div class="container">
      <div class="columns">
        <div class="column is-two-third"></div>
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
      this.$http.get('http://api.news.nixia.tech/post/featured')
      .then((response) => {
        if (response.body.meta.status === true) {
          this.featureds = response.body.data
          this.first = this.featureds[0]
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

      this.$http.get('http://api.news.nixia.tech/post?category=biz&offset=1')
      .then((response) => {
        if (response.body.meta.status === true) {
          this.business = response.body.data
        }
      }, (response) => {
      })

      this.$http.get('http://api.news.nixia.tech/post?category=lifestyle&offset=1')
      .then((response) => {
        if (response.body.meta.status === true) {
          this.lifestyles = response.body.data
        }
      }, (response) => {
      })

      this.$http.get('http://api.news.nixia.tech/post?category=game&offset=1')
      .then((response) => {
        if (response.body.meta.status === true) {
          this.games = response.body.data
        }
      }, (response) => {
      })

      this.$http.get('http://api.news.nixia.tech/post?category=gadget&offset=1')
      .then((response) => {
        if (response.body.meta.status === true) {
          this.gadgets = response.body.data
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

