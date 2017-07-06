<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送分钟</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <span class="icon-favorite" :class="{'active':favorite}"></span>
                    <div class="text">{{favoriteText}}</div>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h2 class="title">公告与活动</h2>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="support" >
                    <li class="support-item" v-for="(item, index) in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h2 class="title">商家实景</h2>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" alt="" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h2 class="title">商家信息</h2>
                <ul>
                    <li class="info-item" v-for="item in seller.infos">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import star from '../components/base/star.vue';
    import split from '../components/base/split.vue';
    import BScroll from 'better-scroll';
    import {saveToLocal,loadFromLocal} from '../common/js/store';
    export default{
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                favorite: (() => {
                    return loadFromLocal(this.seller.id, 'favorite');
                })()
            };
        },
        computed: {
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏';
            }
        },
        components: {
            star,
            split
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this._initScroll();
            this._initScrollX();
        },
        watch: {
            'seller'() {
               this._initScroll();
            }
        },
        ready() {
            this._initScroll();
            this._initScrollX();
        },
        methods: {
            toggleFavorite(event) {
                if (!event._constructed) {
                    return;
                }
                this.favorite = !this.favorite;
                localStorage.favorite = this.favorite;
                saveToLocal(this.seller.id, 'favorite', this.favorite);
            },
            _initScroll() {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.seller, {
                            click: true,
                            checkDOMChanges: true,
                            probeType: 3
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            _initScrollX() {
                    this.$nextTick(() => {
                        if (!this.picScroll) {
                            this.picScroll = new BScroll(this.$refs.picWrapper, {
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            });
                        } else {
                            this.picScroll.refresh();
                        }
                    });
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../common/stylus/mixin.styl";
    .seller {
        position: absolute;
        top: 174px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        background: #ffffff;
        .overview {
            padding: 18px;
            .title{
                margin-bottom: 8px;
                line-height: 14px;
                color: rgb(7,17,27);
                font-size: 14px;
                font-weight: 700;
            }
            .desc{
                padding-bottom: 18px;
                border-bottom: 0.5px solid rgba(7,17,27,0.1);
                font-size: 0;
                .star{
                    display: inline-block;
                    margin-right: 8px;
                    vertical-align: top;
                }
                .text{
                    margin-right: 12px;
                    display: inline-block;
                    vertical-align: top;
                    line-height: 18px;
                    font-size: 10px;
                }
            }
            .remark{
                display: flex;
                padding-top: 18px;
                .block{
                    flex: 1;
                    text-align: center;
                    border-right: 1px solid rgba(7,17,27,0.1);
                    h2{
                        margin-bottom: 4px;
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147,153,159);
                    }
                    .content{
                        line-height: 24px;
                        font-size: 10px;
                        color: rgb(7,17,27);
                        .stress{
                            font-size: 24px;
                        }
                    }
                }
                .block:last-child{
                    border-right:none;
                }
            }
            .favorite{
                position: absolute;
                width: 42px;
                right: 18px;
                top: 18px;
                text-align: center;
                .icon-favorite{
                    display: block;
                    line-height: 24px;
                    font-size: 24px;
                    margin-bottom: 4px;
                    color: #d4d6d9;
                }
                .active{
                    color: rgb(240,20,20);
                }
                .text{
                    line-height: 10px;
                }
            }
        }
        .bulletin{
            padding:18px 18px 0 18px;
            .title{
                margin-bottom: 8px;
                line-height: 14px;
                color: rgb(7,17,27);
                font-size: 14px;
                font-weight: 700;
            }
            .content-wrapper{
                padding: 0 12px 16px 12px;
                border-bottom: 0.5px solid rgba(7,17,27,0.1);
                .content{
                    line-height: 24px;
                    font-size: 12px;
                    color: rgba(240,20,20,0.9);
                    text-indent: 2em;
                }
            }
            .support{
            .support-item{
                padding: 16px 12px;
                font-size: 0;
                border-bottom: 0.5px solid rgba(7,17,27,0.1);
            .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat:no-repeat;
            }
            .decrease{
            bg-image('../components/img/decrease_4')
            }
            .discount{
            bg-image('../components/img/discount_4')
            }
            .guarantee{
            bg-image('../components/img/guarantee_4')
            }
            .invoice{
            bg-image('../components/img/invoice_4')
            }
            .special{
            bg-image('../components/img/special_4')
            }
            .text{
                font-size: 12px;
                line-height: 16px;
                color: rgb(7,17,27);
            }
            }
            .support-item:last-child{
                margin-bottom: 0;
                border-bottom: 0;
            }
            }
        }
        .pics{
            .pic-list{
                width: 498px;
            }
            padding: 18px;
            .title{
                margin-bottom: 12px;
                line-height: 14px;
                color: rgb(7,17,27);
                font-size: 14px;
            }
            .pic-wrapper{
                width: 100%;
                overflow: hidden;
                white-space:nowrap;
                .pic-item{
                    display: inline-block;
                    margin-right: 6px;
                    width: 120px;
                    height: 90px;
                }
                .pic-item:last-child{
                    margin: 0;
                }
            }
        }
        .info{
            padding:18px 18px 0 18px;
            .title {
                padding-bottom: 12px;
                line-height: 14px;
                color: rgb(7, 17, 27);
                font-size: 14px;
                font-weight: 700;
                border-bottom: 0.5px solid rgba(7,17,27,0.1);
            }
            .info-item{
                padding: 16px 12px;
                line-height: 16px;
                border-bottom: 0.5px solid rgba(7,17,27,0.1);
            }
            .info-item:last-child{
                border-bottom:0;
            }
        }
    }
</style>
