<template>
  <nav id="nav" :class="{'collapsed' : isCollapsed}">
    <!--item::: {{item}}-->
    <!--isCollapsed ::: {{isCollapsed}}-->
    <ul class="default-list menu-list">
      <item v-for="(item, index) in menuList" :key="index" :item="item" :firstItem="true" :isCollapsed="isCollapsed" />
    </ul>
    <!--<div v-if="isCollapsed">-->
      <!--<transition name="show-animation" v-if="item && item.child">-->
        <!--<ul v-if="item && item.child" class="mobile-list drop-content" >-->
          <!--<sub-item v-for="(subItem, index) in item.child" :item="subItem" :key="index"/>-->
        <!--</ul>-->
      <!--</transition>-->
    <!--</div>-->
  </nav>
</template>

<script>
  import Item from './components/Item'
  import SubItem from './components/SubItem'
  import {itemMixin} from '../../components/common/mixin'
  import {menuList} from './menuList'
  export default {
    name: "TopNav",
    components: {
      SubItem,
      Item,
    },
    mixins: [itemMixin, menuList],
    props: {
      collapsed: {
        types: Boolean,
        default: false
        //default: true
      }
    },
    data(){
      return{
        item: null,
        itemPos: 0,
        isCollapsed: this.collapsed,
      }
    },
    created() {
      this.$on('mouseEnterItem', (val) => {
        this.item = val.item
        this.itemPos = val.pos
      })
    },
    methods: {
      toggleCollapse(){
        this.isCollapsed = !this.isCollapsed
        this.$emit('collapse', this.isCollapsed);
      }
    },
    mounted() {
      this.toggleCollapse()
    }

  }
</script>

<style scoped>

</style>
