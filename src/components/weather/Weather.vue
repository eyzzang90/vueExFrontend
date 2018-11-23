<template>
  <div>
    <!--
        하위 > 상위로 data를 전달할 때, v-on, $emit디렉티브 사용
        getLeafCode 에 따라서, setLeafCode가 실행된다.
    -->

    <type v-on:takeLeafCode="setLeafCode" v-on:takeCity="setCity" v-on:takeCountry="setCountry"
          v-on:takeVillage="setVillage"></type>
    <div>현재 날씨</div>
    <info :weather="weather" :city="city" :country="country" :village="village"></info>
    <div>3시간 예보</div>
    <chart :leafCode="leafCode" v-on:weather="setWeather" :city="city" :country="country" :village="village"></chart>
    <div>중기 예보</div>
    <mid-chart :leafCode="leafCode" :mdlName="mdlName" :city="city" :country="country" :village="village"></mid-chart>
    <!--<canvas ref="canvas" class="canvas" v-bind:width="800" v-bind:height="550" style="display: none"></canvas>-->
    <!--<canvas ref="daily" class="canvas" v-bind:width="1600" v-bind:height="550"></canvas>-->
  </div>
</template>
<script>
  import Type from "./Type";
  import Chart from "./ShortChart";
  import Info from './Info';
  import MidChart from './MidChart';


  export default {
    name: "Weather",
    components: {Info, Chart, Type, MidChart},
    data() {
      return {
        leafCode: '',
        weather: null,
        mdlName: '',
        city: '',
        country: '',
        village: ''
      }
    },
    methods: {
      setLeafCode: function (leafCode) {
        this.leafCode = leafCode;
      },
      setWeather: function (weather) {
        this.weather = weather;
      },
      setCity: function (city) {
        this.city = city;
      },
      setCountry: function (country) {
        this.country = country;
      },
      setVillage: function (village) {
        this.village = village;
        this.mdlName = village;
        console.log('village is changed')
        console.log('village> ' + this.village);
        console.log('weather> ' + this.weather);
      }
    }
  }
</script>

<style scoped>

</style>
