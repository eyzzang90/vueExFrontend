<template>
  <!-- Header -->
  <section id="header">
    <div class="container">
      <!-- Nav -->
      <TopNav/>
      <!--<nav id="nav">-->
      <!---->
      <!--<ul>-->
      <!--<li>-->
      <!--<router-link to="/"><span>main</span></router-link>-->
      <!--</li>-->
      <!--<li class="drop-menu" v-on:mouseout="hideDropMenu()">-->
      <!--<router-link to="weather"><span v-on:mouseover="showDropMenu()" >weather</span></router-link>-->
      <!--<ul class="drop-content">-->
      <!--<li><a href="#">Lorem ipsum dolor</a></li>-->
      <!--<li><a href="#">Magna phasellus</a></li>-->
      <!--<li><a href="#">Etiam dolore nisl</a></li>-->
      <!--<li>-->
      <!--<a href="#">Phasellus consequat</a>-->
      <!--<ul>-->
      <!--<li><a href="#">Magna phasellus</a></li>-->
      <!--<li><a href="#">Etiam dolore nisl</a></li>-->
      <!--<li><a href="#">Phasellus consequat</a></li>-->
      <!--</ul>-->
      <!--</li>-->
      <!--<li><a href="#">Veroeros feugiat</a></li>-->
      <!--</ul>-->
      <!--</li>-->
      <!--<li class="drop-menu" v-on:mouseout="hideDropMenu()">-->
      <!--<router-link to="movie"><span v-on:mouseover="showDropMenu()">movie</span></router-link>-->
      <!--<ul class="drop-content">-->
      <!--<li><a href="#">2</a></li>-->
      <!--<li><a href="#">SAMPLE</a></li>-->
      <!--<li><a href="#">Etiam dolore nisl</a></li>-->
      <!--<li><a href="#">Veroeros feugiat</a></li>-->
      <!--</ul>-->
      <!--</li>-->
      <!--<li>-->
      <!--&lt;!&ndash;<a class="icon fa-retweet" href="canvas"><span>canvas</span></a>&ndash;&gt;-->
      <!--<router-link to="canvas"><span>canvas</span></router-link>-->
      <!--</li>-->
      <!--<li>-->
      <!--&lt;!&ndash;<a class="icon fa-sitemap" href="tournament"><span>tournament</span></a>&ndash;&gt;-->
      <!--<router-link to="tournament"><span>tournament</span></router-link>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</nav>-->

    </div>
  </section>

</template>

<script>
  import TopNav from './TopNav'
  export default {
    name: "Header",
    components: {TopNav},
    data(){
      return{
        isActive: false
      }

    },
    methods: {

    },
    mounted(){
    }
  }

</script>

<style scoped>
  .drop-menu {

  }
  .drop-content {
    list-style: none;
    margin:0px;
    padding:2px 10px;
    position:absolute;
    left:400px;
    top:100%;
    background-color:#eeeeee;
    opacity:0;
    transition:opacity 0.5s linear;
  }
  .drop-menu:hover > .display{
    opacity: 1;
  }
  .drop-content .display{
    opacity: 1;
  }

  .drop-content a:hover {
    background-color: #6a75dd;
  }
</style>
