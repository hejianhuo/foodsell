<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h2 class="score">{{seller.score}}</h2>
                    <div class="title">综合评论</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <rating-select :desc="desc" :ratings="ratings"
                           @ratingselect="onChange('selectType',$event)" @ratingtoggle="onChange('onlyContent',$event)"></rating-select>
            <div class="rating-wrapper">
                <ul>
                    <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
                        <div class="avatar">
                            <img width="28" height="18" :src="rating.avatar" alt="">
                        </div>
                        <div class="content">
                            <div class="name">{{rating.username}}</div>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{seller.deliveryTime}}分钟</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend.length">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                                    <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import star from '../components/base/star.vue';
    import split from '../components/base/split.vue';
    import ratingSelect from '../components/base/ratingselect.vue';
    import {formatDate} from '../common/js/date';
    import BScroll from 'better-scroll';
    const ALL = 2;
    const ERR_OK = 0;
    export default{
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                selectType: ALL,
                onlyContent: false,
                desc: {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                },
                ratings: []
            };
        },
        filters: {
            formatDate(time) {
                let data = new Date(time);
                return formatDate(data, 'yyyy-MM-dd hh:mm');
            }
        },
        created() {
            this.$http.get('/api/ratings').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.ratings = response.data;
                    this._initScroll();
                }
            });
        },
        components: {
            star,
            split,
            ratingSelect
        },
        methods: {
            onChange(attr, val) {
                this[attr] = val;
                this._initScroll();
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
            },
            _initScroll() {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.ratings, {
                            click: true,
                            checkDOMChanges: true,
                            probeType: 3
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .ratings{
        position: absolute;
        top: 174px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        background: #ffffff;
        .overview{
            display: flex;
            padding: 18px 0;
            .overview-left{
                flex: 0 0 137px;
                width: 137px;
                border-right:1px solid rgba(7,17,27,0.1);
                text-align: center;
                padding: 6px 0;
                @media only screen and (max-width:320px) {
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score{
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255,153,0);
                }
                .title{
                    line-height: 12px;
                    font-size: 12px;
                    font-weight:500;
                    color: rgb(7,17,27);
                    padding-bottom: 8px;
                }
                .rank{
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(147,153,159);
                }
            }
            .overview-right{
                flex: 1;
                padding: 6px 24px;
                @media only screen and (max-width:320px) {
                    padding: 6px 6px;
                }
                .score-wrapper{
                    margin-bottom: 8px;
                    font-size: 0;
                    .title{
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(7,17,27);
                    }
                    .star{
                        display: inline-block;
                        margin: 0 12px;
                        vertical-align: top;
                        @media only screen and (max-width:320px) {
                            margin: 0 6px;
                        }
                    }
                    .score{
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(255,153,0);
                    }
                }
                .delivery-wrapper{
                    font-size: 0;
                    .title{
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(7,17,27);
                    }
                    .delivery{
                        margin-left:12px;
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(147,153,157);
                    }
                }
            }
        }
        .rating-wrapper{
            padding:0 18px;
            .rating-item{
                display: flex;
                padding:18px 0;
                border-bottom: 0.5px solid rgba(7,17,27,0.1);
                .avatar{
                    flex: 0 0 28px;
                    width: 28px;
                    height: 28px;
                    margin-right: 12px;
                    img{
                        border-radius: 50%;
                    }
                }
                .content{
                    position: relative;
                    flex: 1;
                    .name{
                        line-height: 12px;
                        margin-bottom:4px;
                        font-size: 10px;
                        color: rgb(7,17,27);
                    }
                    .star-wrapper{
                        margin-bottom:6px;
                        font-size: 0;
                        .star{
                            display: inline-block;
                            margin-right: 6px;
                            vertical-align: top;
                        }
                        .delivery{
                            display: inline-block;
                            vertical-align: top;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147,153,159);
                        }
                    }
                    .text{
                        line-height: 18px;
                        margin-bottom: 8px;
                        color: rgb(7,17,27);
                        font-size: 12px;
                    }
                    .recommend{
                        line-height: 16px;
                        .icon-thumb_up,.icon-thumb_down,.item{
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                        }
                        .item{
                            padding:0 6px;
                            border: 0.5px solid rgba(7,17,27,0.1);
                            border-radius: 1px;
                            color: rgb(147,153,159);
                            background: #ffffff;
                        }
                        .icon-thumb_up{
                            color: rgb(0,140,220);
                        }
                        .icon-thumb_down{
                            color: rgb(147,153,159);
                        }
                    }
                    .time{
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size: 10px;
                        line-height: 12px;
                        color: rgb(147,153,159);
                    }
                }
            }
        }
    }
</style>
