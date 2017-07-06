<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avater">
                <img  width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support" >
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span><span
                class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right" @click="showDetail"></i>
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="detail-name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <mystar :size="48" :score="seller.score"></mystar>
                        </div>
                        <div class="detail-title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="support" >
                            <li class="support-item" v-for="(item, index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="detail-title">
                            <div class="line"></div>
                            <div class="text">商家通告</div>
                            <div class="line"></div>
                        </div>
                        <div class="detail-bulletin">
                            <span class="bulletin-text">{{seller.bulletin}}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-close">
                    <i class="icon-close" @click="hiddenDetail"></i>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import mystar from './base/star.vue';
    export default {
        components: {
            mystar
        },
      props: {
          seller: {
              type: Object
          }
      },
        data () {
          return {
              detailShow: false
          };
        },
        methods: {
          showDetail() {
              this.detailShow = true;
          },
            hiddenDetail() {
                this.detailShow = false;
            }
        },
        created() {
          this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../common/stylus/mixin.styl";
    .header{
        background: rgba(7,17,27,0.5);
        color: #fff;
        .content-wrapper{
            position: relative;
            padding: 24px 12px 18px 24px;
            font-size: 0;
            .avater{
                display: inline-block;
                vertical-align: top;
                img{
                    border-radius: 2px;
                }
            }
            .content{
                display: inline-block;
                font-size: 14px;
                margin-left:16px;
                .title{
                    margin: 1px 0 4px 0;
                    .brand{
                        display: inline-block;
                        vertical-align: top;
                        width: 30px;
                        height: 18px;
                        bg-image('img/brand');
                        -webkit-background-size:30px 18px;
                        background-size:30px 18px;
                        background-repeat: no-repeat;
                    }
                    .name{
                        margin-left:3px;
                        font-size: 8px;
                        line-height: 9px;
                        font-weight: bold;
                    }
                }
                .description{
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                }
                .support{
                    .icon{
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        -webkit-background-size: 12px;
                        background-size: 12px;
                    }
                    .decrease{
                        bg-image('img/decrease_1')
                    }
                    .discount{
                        bg-image('img/discount_1')
                    }
                    .guarantee{
                        bg-image('img/guarantee_1')
                    }
                    .invoice{
                        bg-image('img/invoice_1')
                    }
                    .special{
                        bg-image('img/special_1')
                    }
                    .text{
                        line-height: 12px;
                        font-size: 10px;
                        vertical-align: top;
                    }
                }
            }
            .support-count{
                position: absolute;
                right: 12px;
                bottom: 18px;
                padding: 7px 8px;
                height: 12px;
                line-height: 12px;
                border-radius: 14px;
                background: rgba(0,0,0,0.2);
                text-align: center;
                .count{
                    font-size: 10px;
                    margin-right: 4px;
                }
                .icon-keyboard_arrow_right{
                    font-size: 10px;
                }
            }
        }
        .bulletin-wrapper{
            height: 28px;
            line-height:28px;
            position: relative;
            padding: 0 22px 0 12px;
            background: rgba(7,17,27,0.2);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .bulletin-title{
                display: inline-block;
                vertical-align: top;
                width: 22px;
                height: 12px;
                margin-top: 7px;
                bg-image('img/bulletin');
                -webkit-background-size:22px 12px;
                background-size:22px 12px;
                background-repeat:no-repeat;
            }
            .bulletin-text{
                vertical-align: top;
                margin: 0 4px;
                font-size: 10px;
                vertical-align: top;
            }
            .icon-keyboard_arrow_right{
                position: absolute;
                right: 12px;
                top: 8px;
                font-size: 10px;
            }

        }
        .detail{
            position: fixed;
            width: 100%;
            height: 100%;
            overflow: auto;
            left: 0;
            top: 0;
            background: rgba(7,17,27,0.8);
            z-index: 500;
            backdrop-filter: blur(10px);
            .detail-wrapper{
                width: 100%;
                min-height: 100%;
                .detail-main{
                    margin-top: 64px;
                    padding-bottom: 80px;
                    .detail-name{
                        font-size: 16px;
                        text-align: center;
                        font-weight: bold;
                    }
                    .star-wrapper{
                        margin-top: 16px;
                        text-align: center;
                    }
                    .detail-title{
                        display: flex;
                        width: 80%;
                        margin: 28px auto 24px auto;
                        .line{
                            flex: 1;
                            position: relative;
                            top: -6px;
                            border-bottom: 1px solid rgba(255,255,255,0.2);
                        }
                        .text{
                            padding: 0 12px;
                            font-size:14px;
                            font-weight: 700;
                        }
                    }
                    .support{
                        width: 80%;
                        margin: 0 auto;
                        .support-item{
                            padding: 0 12px;
                            margin-bottom: 12px;
                            font-size: 0;
                        }
                        .support-item:last-child{
                            margin-bottom: 0;
                        }
                        .icon{
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: top;
                            margin-right: 6px;
                            -webkit-background-size:16px 16px;
                            background-size:16px 16px;
                            background-repeat:no-repeat;
                        }
                        .decrease{
                        bg-image('img/decrease_2')
                        }
                        .discount{
                        bg-image('img/discount_2')
                        }
                        .guarantee{
                        bg-image('img/guarantee_2')
                        }
                        .invoice{
                        bg-image('img/invoice_2')
                        }
                        .special{
                        bg-image('img/special_2')
                        }
                        .text{
                            line-height: 16px;
                            font-size: 12px;
                        }
                    }
                    .detail-bulletin{
                        width: 80%;
                        margin: 0 auto;
                        .bulletin-text{
                            padding: 0 12px;
                            font-size: 12px;
                            line-height: 24px;
                        }
                    }
                }
            }
            .detail-close{
                position: relative;
                width: 32px;
                height: 32px;
                margin:-80px auto 0 auto;
                clear: both;
                font-size: 32px;
                z-index: 500;
            }
        }

    }
    .fade-enter-active,.fade-leave-active{
        transition: all 1s;
    }
    .fade-transition{
        opacity: 1;
        background: rgba(7,17,27,0.8);
    }
    .fade-enter,.fade-leave{
        opacity: 0;
        background: rgba(7,17,27,0);
    }
</style>
