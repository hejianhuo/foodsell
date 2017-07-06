<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper" @click="toggleList">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                    </div>
                    <div class="totalCount" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
                <div class="desc">另需配送费¥{{seller.deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click="pay">
                <div class="pay" :class="{'enough':this.totalPrice >= this.seller.minPrice}">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <!--<div class="ball-container">
            <transition-group name="drop">
                <div v-for="ball in balls" v-show="ball.show" class="ball"></div>
            </transition-group>
        </div>-->
        <transition name="lineMove">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="food" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <span class="price">
                            ¥{{food.price*food.count}}
                        </span>
                            <div class="cartcontrol-wrapper">
                                <cart-control :food="food"></cart-control>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="bgfade">
            <div class="list-mask" v-show="listShow" @click.stop.prevent="hiddenList"></div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import cartControl from '../components/cartcontrol.vue';
    import BScroll from 'better-scroll';
    export default {
        components: {
            cartControl
        },
        data() {
            return {
                fold: true
            };
        },
        props: {
            seller: {
                type: Object
            },
            selectFoods: {
                type: Array
            }
        },
        methods: {
            toggleList() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            hiddenList() {
                this.fold = true;
            },
            pay() {
                if (this.totalPrice < this.seller.minPrice) {
                    return;
                }
                window.alert(`支付${this.totalPrice + this.seller.deliveryPrice}元`);
            }
        },
        computed: {
            totalPrice() {
                let tPrice = 0;
                this.selectFoods.forEach((food) => {
                    tPrice += food.price * food.count;
                });
                return tPrice;
            },
            totalCount() {
                let tCount = 0;
                this.selectFoods.forEach((food) => {
                    tCount += food.count;
                });
                return tCount;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `¥${this.seller.minPrice}元起送`;
                } else if (this.totalPrice < this.seller.minPrice) {
                    let diff = this.seller.minPrice - this.totalPrice;
                    return `还差¥${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            listShow() {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .bgfade-enter-active,.bgfade-leave-active{
        transition: all 0.5s;
    }
    .bgfade-transition{
        opacity: 1;
        background: rgba(7,17,27,0.6);
    }
    .fade-enter,.fade-leave{
        opacity: 0;
        background: rgba(7,17,27,0);
    }
    .lineMove-enter-active {
        transition: all 0.5s;
    }
    .lineMove-enter {
        transform: translate3d(0,100%,0);
    }
    .lineMove-leave-active {
        transition: all 1s;
        transform: translateY(100%);
    }
    .shopcart{
        position: fixed;
        z-index: 50;
        left: 0;
        bottom: 0;
        background: #ffffff;
        width: 100%;
        height: 48px;
        .list-mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 20;
            -webkit-backdrop-filter: blur(10px);
            background: rgba(7,17,27,0.6);
        }
        .content{
            display: flex;
            background: #141d27;
            z-index: 50;
            position: relative;
            .content-left{
                flex: 1;
                .logo-wrapper{
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background: #141d27;
                    .logo{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #2b343c;
                        text-align: center;
                        .icon-shopping_cart{
                            line-height: 44px;
                            font-size: 24px;
                            color: #80858a;
                        }
                        .highlight{
                            color: rgb(255,255,255);
                        }
                    }
                    .highlight{
                        background: rgb(0,160,220);
                    }
                    .totalCount{
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 9px;
                        font-weight: 700;
                        color: #ffffff;
                        background: rgb(240,20,20);
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
                    }
                }
                .price{
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin: 12px 0;
                    padding-right: 12px;
                    box-sizing: border-box;
                    border-right:1px solid rgba(255,255,255,0.1);
                    font-size: 16px;
                    font-weight: 700;
                    color: rgba(255,255,255,0.4);
                }
                .highlight{
                    color: rgb(255,255,255);
                }
                .desc{
                    display: inline-block;
                    vertical-align: top;
                    margin: 12px 0 0 12px;
                    line-height: 24px;
                    color: rgba(255,255,255,0.4);
                    font-size: 10px;
                }
            }
            .content-right{
                flex: 0 0 105px;
                width: 105px;
                .pay{
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 12px;
                    color: rgba(255,255,255,0.4);
                    font-weight: 700;
                    background: #2b333b;
                }
                .enough{
                    background: #00b43c;
                    color: #ffffff;
                }
            }
        }
        .shopcart-list{
            position: absolute;
            left: 0;
            bottom: 48px;
            z-index: 40;
            width: 100%;
            .list-header{
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7,17,27,0.1);
                .title{
                    float: left;
                    font-size: 14px;
                    color: rgb(7,17,27);
                    font-weight: 200;
                }
                .empty{
                    float: right;
                    color: rgb(7,17,27);
                    color: rgb(0,160,220);
                    font-weight: 200;
                }
            }
            .list-content{
                padding: 0 12px;
                max-height: 210px;
                overflow: hidden;
                background: #ffffff;
                .food{
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(7,17,27,0.1);
                    .name{
                        line-height: 24px;
                        font-size: 14px;
                        color: rgb(7,17,27);
                        font-weight: 500;
                    }
                    .price{
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        line-height: 24px;
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240,20,20);
                    }
                    .cartcontrol-wrapper{
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }
            }
        }
    }
</style>
