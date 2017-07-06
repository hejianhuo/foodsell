<template>
    <div class="app">
        <v-header :seller="seller"></v-header>
        <div class="tab">
            <div class="tab-item">
                <router-link :to="{ path: '/' }" exact>商品</router-link>
            </div>
            <div class="tab-item" >
                <router-link :to="{ path: 'ratings' }">评论</router-link>
            </div>
            <div class="tab-item" >
                <router-link :to="{ path: 'seller' }" >商家</router-link>
            </div>
        </div>
        <div class="content">
            <keep-alive>
                <router-view :seller="seller"></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import myHeader from './components/header.vue';
    import {urlParse} from './common/js/util';
    const ERR_OK = 0;
    export default {
        data () {
            return {
                seller: {
                     id: (() => {
                        let queryParam = urlParse();
                        return queryParam.id;
                    })()
                }
            };
        },
        created() {
            this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.seller = Object.assign({}, this.seller, response.data);
                }
            });
        },
        components: {
            vHeader: myHeader
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "common/stylus/style.css";
    .app {

    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #fff;
    .tab-item {
        flex: 1;
        text-align: center;
        border-bottom: 0.5px solid rgba(7,17,27,0.1);
    a {
        display: block;
        font-size: 14px;

    }

    a.active {
        color: rgb(240, 20, 20);
    }

    }

    }
    }

    /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
   */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body,html {
        line-height: 1;
        font-weight: 200;
        font-family: 'PingFang SC','STHeitiSC-Light',Arial,sans-serif;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    body {
        background: #f0f2f5;
        font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
        font-size: 14px;
        color: #444;
    }

    .app-head {
        background: #363636;
        color: #b2b2b2;
        height: 90px;
        line-height: 90px;
        width: 100%;
    }

    /*缩放*/
    /*  @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
          .border-px

      &::after {
           -webkit-transform: scaleY(0.7);
           transform: scaleY(0.7);
       }
      }

      @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
          .border-px

      &::after {
           -webkit-transform: scaleY(0.5);
           transform: scaleY(0.5);
       }
      }

      .border-px {
          position: relative;

      &
      :after {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          content: '';
      }

      }*/
</style>
