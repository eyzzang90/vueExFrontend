<template>
  <li :class="[{'has-dropdown' : item.child}, {'open' : show}]" style="white-space: nowrap;">
    <template v-if="isRouterLink">
      <router-link :to="item.href" @click.native="clickEvent">
        <i v-if="item.icon" class="item-icon" :class="item.icon" ></i>
        <span class="item-text">{{item.title}}</span>
        <i class="item-arrow" v-if="item.child"></i>
      </router-link>
    </template>
    <template v-else>
      <a :href="!item.child ? item.href : '#'" @click="clickEvent" :class="{'active' : isLinkActive}">
        <i v-if="item.icon" class="item-icon" :class="item.icon" ></i>
        <span class="item-text">{{item.title}}</span>
        <i class="item-arrow" v-if="item.child"></i>
      </a>
    </template>
    <div class="dropdown" v-if="item.child">
      <transition name="show-animation">
        <ul v-if="show" class="drop-content">
          <item v-for="(subItem, index) in item.child" :item="subItem" :key="index" />
        </ul>
      </transition>
    </div>
  </li>
</template>

<script>
  import Item from './Item'
  import {itemMixin} from '../../common/mixin'
  export default {
    name: "SubItem",
    mixins: [itemMixin],
    props: {
      item: Object,
    },
    data() {
      return {
        show: false
      }
    },
    components: {
      Item
    },
    beforeCreate() {
      this.$options.components.Item = require('./Item.vue').default
    },
  }
</script>

<style scoped>

</style>
