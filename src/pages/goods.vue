<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" @click="selectMenu(index,$event)" class="menu-item" :class="{'current':currentIndex===index}">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click.stop.prevent="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
                            <div class="icon">
                                <img  width="57" height="57" :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                                </div>
                                <div class="cart-control-wrapper">
                                    <cart-control :food="food"></cart-control>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shop-cart :seller="seller" :select-foods="selectFoods"></shop-cart>
        <food-sel ref="food" :food="selectedFood"></food-sel>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartControl from '../components/cartcontrol.vue';
    import shopCart from '../components/shopcart.vue';
    import foodSel from '../components/food.vue';
    const ERR_OK = 0;
    export default{
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            cartControl,
            shopCart,
            foodSel
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        computed: {
            currentIndex() {
                let a = this.listHeight.length;
                for (let i = 0; i < a; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('./api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            });
        },
        methods: {
            selectMenu(index, event) {
                if (!event._constructed) {
                    return;
                }
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodScroll.scrollToElement(el,300);
            },
            _initScroll() {
                this.foodScroll = new BScroll(this.$refs.foodWrapper, {
                    probeType: 3,
                    click: true
                });
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight() {
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectFood(food, event) {
                if (!event._constructed) {
                    return;
                }
                this.selectedFood = food;
                this.$refs.food.show();
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../common/stylus/mixin.styl";
    .goods{
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        overflow: hidden;
        width: 100%;
        .menu-wrapper{
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            .menu-item{
                display: table;
                height: 54px;
                width: 56px;
                padding: 0 12px;
                line-height: 14px;
                .icon{
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 2px;
                    -webkit-background-size:12px 12px;
                    background-size:12px 12px;
                    background-repeat:no-repeat;
                }
                .text{
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    font-size: 12px;
                    line-height: 14px;
                    color: rgb(24,20,22);
                    border-bottom:1px solid rgba(7,17,27,0.1);
                }
                .decrease{
                bg-image('../components/img/decrease_3')
                }
                .discount{
                bg-image('../components/img/discount_3')
                }
                .guarantee{
                bg-image('../components/img/guarantee_3')
                }
                .invoice{
                bg-image('../components/img/invoice_3')
                }
                .special{
                bg-image('../components/img/special_3')
                }
            }
            .current{
                position: relative;
                z-index: 10;
                margin-top: -1px;
                background: #ffffff;
                font-weight: 700;
                .text{
                    border-bottom: none;
                }
            }
        }
        .foods-wrapper{
            background: #ffffff;
            flex: 1;
            .title{
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left:2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147,153,159);
                background: #f3f5f7;
                font-weight: bold;
            }
            .food-item:last-child{
                border-bottom:none;
                margin-bottom: 0;
             }
            .food-item{
                position: relative;
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                border-bottom:1px solid rgba(7,17,27,0.1);
                .icon{
                    flex:0 0 57px;
                    margin-right: 10px;
                }
                .content{
                    flex:1;
                    .name{
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7,17,27);
                    }
                    .desc,.extra{
                        font-size: 10px;
                        line-height: 14px;
                        color: rgb(147,153,159);
                    }
                    .desc{
                        margin-bottom: 4px;
                    }
                    .extra{
                        .count{
                            margin-right: 12px;
                        }
                    }
                    .price{
                        font-weight: 700;
                        line-height: 24px;
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
                    .cart-control-wrapper{
                        position: absolute;
                        right: 0;
                        bottom: 10px;
                    }
                }
            }
        }
    }
</style>
