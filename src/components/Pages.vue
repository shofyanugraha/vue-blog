<template>
  <div id="pages">
    <div class="container">
      <div class="columns" id="featured" v-if="featureds.length > 0">
        <article class="column featured is-6">
          <router-link class="content-wrapper" v-bind:style="setBackground(first)" :to="{name: 'showPost', params: { slug: first.slug }}">
            <div class="content">
              <h1 class="title">{{ first.title }}</h1>
              <small>Ditulis oleh {{ first.full_name }}  pada {{ moment(first.created_at).fromNow() }}</small>
            </div>
          </router-link>
        </article>
        <div class="column is-6" v-if="featureds.length > 0" >
          <div class="columns is-multiline">
          <article class="column is-6" v-for="(featured, index) in featureds" v-if="index != 0" >
            <router-link class="content-wrapper" v-bind:style="setBackground(featured)" :to="{name: 'showPost', params: { slug: featured.slug }}">
              <div class="content">
                <h1 class="title">{{ featured.title }}</h1>
                <small>Ditulis oleh {{ featured.writer.full_name }}  pada {{ moment(featured.created_at).fromNow() }}</small>
              </div>
            </router-link> 
          </article>
          </div> 
        </div>
        <div v-else class="uk-text-center uk-block uk-block-primary" id="featured">
          <h1>Belum Ada Featured Content</h1>
        </div>
      </div>
      <div v-else class="columns">
        <div class="column has-text-centered">
          <h1 class="title">Featured Content Belum Tersedia</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <aside class="column is-one-third">
          <div class="widget">
            <div class="widget-title">What's New</div>

            <article class="media" v-for="article in articles" >
              <div class="media-left" href="#">
                <figure class="image is-64x64">
                   <img src="http://placehold.it/128x128" alt="Image">
                </figure>
              </div>
              <div class="media-content">
                  <h3 class="title is-5">{{ article.title }}</h3>
                  <div class="content">
                  <small>Ditulis oleh {{ article.writer.full_name }}  pada {{ moment(article.created_at).fromNow() }}</small>
                  </div>
              </div>
              
            </article>
          </div>
        </aside>
        <aside class="column is-one-third ">
            <article class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="http://placehold.it/300x225" alt="">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <a href="">Biz Corner</a>
                    <p class="title is-5">Article</p>
                  </div>
                </div>

                <div class="content">
                  <small>Ditulis oleh Berry Firmann pada 10 days ago</small>
                </div>
              </div>
            </article>
            <article class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="http://placehold.it/300x225" alt="">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <a href="">Biz Corner</a>
                    <p class="title is-5">Article</p>
                  </div>
                </div>

                <div class="content">
                  <small>Ditulis oleh Berry Firmann pada 10 days ago</small>
                </div>
              </div>
            </article>

        </aside>
        
        <aside class="column is-one-third ">
            <article class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="http://placehold.it/300x225" alt="">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <a href="">Biz Corner</a>
                    <p class="title is-5">Article</p>
                  </div>
                </div>

                <div class="content">
                  <small>Ditulis oleh Berry Firmann pada 10 days ago</small>
                </div>
              </div>
            </article>
            <article class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="http://placehold.it/300x225" alt="">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <a href="">Biz Corner</a>
                    <p class="title is-5">Article</p>
                  </div>
                </div>

                <div class="content">
                  <small>Ditulis oleh Berry Firmann pada 10 days ago</small>
                </div>
              </div>
            </article>

        </aside>
        
      </div>
    </div>
  </div>
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
  .card {
    width: auto;
  }
  #featured {
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
        background: rgba(0,0,0, .5);
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
        background: rgba(0,0,0, .8);
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

