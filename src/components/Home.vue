<template>
  <div id="home">
    <div class="container">
      <div class="columns" id="featured" v-if="featureds.length > 0">
        <article class="column featured is-8">
          <router-link class="content-wrapper" v-bind:style="setBackground(first)" :to="{name: 'showPost', params: { slug: first.slug }}">
            <div class="content">
              <h1 class="title is-1">{{ first.title }}</h1>
              <small>Posted by {{ first.full_name }}  at {{ moment(first.created_at).fromNow() }}</small>
            </div>
          </router-link>
        </article>
        <div class="column is-4" v-if="featureds.length > 0" >
          <div class="columns is-multiline">
          <article class="column is-12" v-for="(featured, index) in featureds" v-if="index != 0" >
            <router-link class="content-wrapper" v-bind:style="setBackground(featured)" :to="{name: 'showPost', params: { slug: featured.slug }}">
              <div class="content">
                <h1 class="title is-1">{{ featured.title }}</h1>
                <small>Posted by {{ featured.writer.full_name }}  at {{ moment(featured.created_at).fromNow() }}</small>
              </div>
            </router-link> 
          </article>
          </div> 
        </div>
        <div v-else class="uk-text-center uk-block uk-block-primary" id="featured">
          <h1>Belum Ada Featured Content</h1>
        </div>
      </div>
      <div v-else id="featured">
        <div class="has-text-centered">
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
        </aside>
        <aside class="column is-one-third ">
          <div class="widget">
            <a class="widget-title" href="">Biz Corner</a>
            <article class="card">
              <div class="card-image">
                <figure class="image is-16by9">
                  <img src="http://placehold.it/300x225" alt="">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-5">Article</p>
                  </div>
                </div>

                <div class="content">
                  <small>Posted by Berry Firmann at 10 days ago</small>
                </div>
              </div>
            </article>
          </div>
          <div class="widget">
            <a class="widget-title" href="">Gadget Corner</a>
            <article class="card">
              <div class="card-image">
                <figure class="image is-16by9">
                  <img src="http://placehold.it/300x225" alt="">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-5">Article</p>
                  </div>
                </div>

                <div class="content">
                  <small>Posted by Berry Firmann at 10 days ago</small>
                </div>
              </div>
            </article>
          </div>
        </aside>
        
        <aside class="column is-one-third ">
          <div class="widget">
            <a class="widget-title" href="">Game Corner</a>
            <article class="card">
              <div class="card-image">
                <figure class="image is-16by9">
                  <img src="http://placehold.it/300x225" alt="">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-5">Article</p>
                  </div>
                </div>

                <div class="content">
                  <small>Posted by Berry Firmann at 10 days ago</small>
                </div>
              </div>
            </article>
          </div>
          <div class="widget">
            <a class="widget-title" href="">Lifestyle Corner</a>
            <article class="card">
              <div class="card-image">
                <figure class="image is-16by9">
                  <img src="http://placehold.it/300x225" alt="">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-5">Article</p>
                  </div>
                </div>

                <div class="content">
                  <small>Posted by Berry Firmann at 10 days ago</small>
                </div>
              </div>
            </article>
          </div>
        </aside>
        
      </div>
    </div>
  </div>
</template>
<script>
import Moment from 'moment'

export default {
  name: 'home',
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
          console.log(this.featureds)
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
        position:absolute;
        z-index: 1;
        color: #fff;
        bottom: 20px;
      }
      .title {
        color: #fff;
        font-weight: bold;
        margin-bottom: 0;
      }
      .meta {
        font-size: 90%;
      }
    }
    .column {
      height: 280px;
      background-position: center;
      position: relative;
      &.featured {
        height: 560px;
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

