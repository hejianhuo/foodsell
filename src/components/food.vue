<template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src=food.image>
                    <div class="back" @click="hidden">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">¥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartControl-wrapper">
                        <cart-control :food="food"></cart-control>
                    </div>
                    <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
                </div>
                <split></split>
                <div class="info" v-show="food.info">
                    <h2 class="title">商品信息</h2>
                    <p class="text">{{food.info}}</p>
                </div>
                <split v-show="food.info"></split>
                <div class="rating">
                    <h2 class="title">商品评价</h2>
                    <rating-select :desc="desc" :ratings="food.ratings"
                    @ratingselect="onChange('selectType',$event)" @ratingtoggle="onChange('onlyContent',$event)"></rating-select>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="rate">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                                    <span class="text">{{rating.text}}</span>
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
                            暂无评价
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartControl from './cartcontrol.vue';
    import Vue from 'vue';
    import {formatDate} from '../common/js/date';
    import split from './base/split.vue';
    import ratingSelect from './base/ratingselect.vue';
    const ALL = 2;
    export default {
        components: {
            cartControl,
            split,
            ratingSelect
        },
        filters: {
            formatDate(time) {
                let data = new Date(time);
                return formatDate(data, 'yyyy-MM-dd hh:mm');
            }
        },
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: false,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        methods: {
            onChange(attr, val) {
                this[attr] = val;
            },
            show() {
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = false;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            hidden() {
                this.showFlag = false;
            },
            addFirst() {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
            },
            needShow(type,text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .food{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        width: 100%;
        z-index: 30;
        background: #fff;

        .image-header{
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;

            img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .back{
                position: absolute;
                background: rgba(0,0,0,0.1);
                top: 0;
                left: 0;
                .icon-arrow_lift{
                    display: block;
                    padding: 16px;
                    color: #ffffff;
                    font-size: 20px;
                }
            }
        }
        .content{
            position: relative;
            padding: 14px;
            .title{
                line-height: 14px;
                margin-bottom:10px;
                font-size: 14px;
                font-weight: 700;
                color: rgb(7,17,27);
            }
            .detail{
                margin-bottom:8px;
                line-height: 10px;
                font-size: 0;
                .sell-count,.rating{
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .sell-count{
                    margin-right: 12px;
                }
            }
            .price{
                font-weight:700;
                line-height: 16px;
                .now{
                    margin-right: 8px;
                    font-size: 14px;
                    color: rgb(240,20,20);
                }
                .old{
                    text-decoration: line-through;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
            }
            .cartControl-wrapper{
                position: absolute;
                right: 18px;
                bottom: 9px;
            }
            .buy{
                position: absolute;
                right: 16px;
                bottom: 14px;
                z-index: 10;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                box-sizing: border-box;
                border-radius: 12px;
                font-size: 12px;
                color: #fff;
                background: rgb(0,160,220);
            }
        }
        .info{
            padding: 18px;
            .title{
                line-height: 14px;
                margin-bottom:6px;
                font-size: 14px;
                color: rgb(7,17,27);
                font-weight: 700;
            }
            .text{
                line-height: 24px;
                padding: 0 8px;
                font-size: 12px;
                color: rgb(77,85,93);
            }
        }
        .rating{
            padding-top: 18px;
            .title{
                line-height: 14px;
                margin-left:18px;
                font-size: 14px;
                color: rgb(7,17,27);
                font-weight: 700;
            }
            .rating-wrapper{
                padding:0 18px;
                .rating-item{
                    position: relative;
                    padding: 16px 0;
                    border-bottom: 0.5px solid rgba(7,17,27,0.1);
                    .user{
                        position: absolute;
                        right: 0;
                        top: 16px;
                        line-height: 12px;
                        font-size: 0;
                        .name{
                            display: inline-block;
                            margin-right: 12px;
                            vertical-align: top;
                            font-size: 10px;
                            color: rgb(147,153,159);
                        }
                        .avatar{
                            border-radius: 50%;
                        }
                    }
                    .time{
                        margin-bottom:6px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147,153,159);
                    }
                    .rate{
                        font-size: 0;
                        .icon-thumb_up,.icon-thumb_down{
                            display: inline-block;
                            line-height: 16px;
                            font-size: 12px;
                        }
                        .icon-thumb_up{
                            color: rgb(0,140,220);
                        }
                        .icon-thumb_down{
                            color: rgb(147,153,159);
                        }
                        .text{
                            line-height: 16px;
                            font-size: 12px;
                            color: rgb(7,17,27);
                            margin-left: 4px;
                        }
                    }
                }
            }
            .no-rating{
                padding:16px 0;
                font-size: 12px;
                color: rgb(147,153,159);
            }
        }
    }
    .move-enter-active {
        transition: all 0.5s;
    }
    .move-enter {
        transform: translateX(100%);
    }
    .move-leave-active {
        transition: all 0.5s;
        transform: translateX(100%);
    }
</style>
