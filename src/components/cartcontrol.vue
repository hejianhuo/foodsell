<template>
    <div class="cart-control">
        <transition name="fade">
            <div v-show="food.count>0" class="cart-decrease icon-remove_circle_outline" @click.stop.prevent="decreaseCart"></div>
        </transition>
        <transition name="fade">
            <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        </transition>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .fade-enter-active,.fadee-leave-active{
        transition: all 1s;
    }
    .fade-transition{
        opacity: 1;
    }
    .fade-enter,.fade-leave{
        opacity: 0;
    }
.cart-control{
    font-size: 0;
    .cart-decrease,.cart-add{
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0,160,220);
    }
    .cart-count{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        font-size: 14px;
        color: rgb(147,153,159);
    }
    .cart-add{
        display: inline-block;
    }
}
</style>
