<template>

  <li :class="[{'has-dropdown' : item.child}]" @mouseenter="mouseEnter($event)" @mouseleave="mouseLeave">

    <template v-if="isRouterLink">
      <router-link :to="item.href" @click.native="clickEvent">
        <i v-if="item.icon" class="item-icon" :class="item.icon"></i>
        <span class="item-text">{{item.title}}</span>
      </router-link>


      <template  v-if="checkShowEvent">
        <transition name="show-animation">
          <ul v-if="item && item.child" class="drop-content level-0 left">
            <sub-item v-for="(subItem, index) in item.child" :item="subItem" :key="index"/>
          </ul>
        </transition>
      </template>


    </template>
    <template v-else>
      <a :href="!item.child ? item.href : '#'" @click="clickEvent" :class="{'active' : isLinkActive}">
        <i v-if="item.icon" class="item-icon" :class="item.icon"></i>
        <span class="item-text">{{item.title}}</span>
      </a>
    </template>
    <!--<div v-if="!isCollapsed && item.child">-->
      <!--<transition name="show-animation">-->
        <!--<ul v-if="show" class="drop-content">-->
        <!--</ul>-->
      <!--</transition>-->
    <!--</div>-->
  </li>
</template>







<script>
  import {itemMixin} from '../../../components/common/mixin'
  import SubItem from './SubItem'
  export default {
    name: "Item",
    mixins: [itemMixin],      //Vue컴포넌트에 재사용 가능한 기능을 배포. (다중 상속을 지원하는 인터페이스)
                              //mixin의 장점 : 캡슐화 및 공통된 기능을 분리시켜 코드 재사용성을 높힘
                              //              오버라이딩 기능도 사용할 수 있어 커스텀 및 확장에 용이하다
    components: {
      SubItem
    },
    data() {
      return {
         show: false,
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      firstItem: {
        type: Boolean,
        default: false
      },
      isCollapsed: {
        type: Boolean,
      },
    },
    methods: {
      mouseEnter(event) {
        if (this.isCollapsed && this.firstItem) {
          if(this.item.child){
            this.show = true;
          }else{
            this.show = false;
          }
          // this.$parent.$emit('mouseEnterItem', {item : this.item, show: this.show, pos: event.currentTarget.getBoundingClientRect().top})
          this.$parent.$emit('mouseEnterItem', {item : this.item, pos: event.currentTarget.getBoundingClientRect().top})
        }
      },
      mouseLeave(){
        this.closeDropdown();
      },
    }
  }
</script>

<style scoped>

</style>
