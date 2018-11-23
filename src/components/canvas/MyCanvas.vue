<template>
    <div class="my-canvas-wrapper">
      <canvas ref="my-canvas"></canvas>
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "MyCanvas",
        data() {
          return {
            provider: {
              context: null
            }
          }
        },
        provide() {
          return {
            provider: this.provider
          }
        },
        mounted() {
          console.log('mycanvas.vue ㄱㄱ');
          this.provider.context = this.$refs['my-canvas'].getContext('2d');  //canvas가 있는 요소 DOM에 getContext('2d');  2d랜더링 컨텍스트 호출
          this.$refs['my-canvas'].width = this.$refs['my-canvas'].parentElement.clientWidth;
          this.$refs['my-canvas'].height = this.$refs['my-canvas'].parentElement.clientHeight;
        }
    }
</script>

<style scoped>

</style>
