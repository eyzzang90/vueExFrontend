<template>

  <section id="top">
    <div class="inner">

      <!--<span class="icon major fa-cloud"></span>-->
      <!--<h1>Hi, I'm <strong>Photon</strong>, another fine<br />-->
      <!--little freebie from <a href="http://html5up.net">HTML5 UP</a>.</h1>-->
      <!--<p>Accumsan feugiat mi commodo erat lorem ipsum, sed magna<br />-->
      <!--lobortis feugiat sapien sed etiam volutpat accumsan.</p>-->
      <!--<ul class="actions special">-->
      <!--<li><a href="#one" class="button scrolly">Discover</a></li>-->
      <!--</ul>-->

      <div class="weather_box">

        <dl class="weather_info">
          <dt class="ico" style="opacity: 1; top: 0px;"><img :alt="wfKor" :src="wfImg" class="weather_img"></dt>
          <dt class="tit" style="opacity: 1; top: 0px; font-size: 40px; margin-bottom: 20px"><strong>{{wfKor}}</strong></dt>
          <dd class="temperature" style="display: block; opacity: 1; top: 0px; font-size: 30px">
          <span class="temp">
							<div style="opacity: 1; top: 0px;">{{tc}}˚</div><!-- 온도 노출 -->
						</span>
          </dd>
        </dl>


        <ul class="weather_etc">
          <li class="rain">
            <dl>
              <dt>
                <span class="tit">강수량</span>
              </dt>
              <dd>
                <strong>
                  <span class="txt">{{prcp}}</span>
                </strong>
                <span class="measure">mm</span>
              </dd>
            </dl>
          </li>
          <li class="temp">
            <dl>
              <dt>
                <span class="tit">최고ㆍ최저</span>
              </dt>
              <dd>
							<span class="high">
								<strong>
									<span class="txt">{{tmax}}</span>
								</strong>
								<span class="measure">˚</span>
							</span>
                <span class="low">
								<strong>
									<span class="txt">{{tmin}}</span>
								</strong>
								<span class="measure">˚</span>
							</span>
              </dd>
            </dl>
          </li>
          <li class="humidity">
            <dl>
              <dt>
                <span class="tit">습도</span>
              </dt>
              <dd>
                <strong>
                  <span class="txt">{{humidity}}</span>
                </strong>
                <span class="measure">%</span>
              </dd>
            </dl>
          </li>
          <li class="wind">
            <dl>
              <dt>
                <span class="tit">풍속ㆍ<span class="wind_dir">{{wdKor}}</span></span>
              </dt>
              <dd>
                <strong>
                  <span class="txt">{{wspd}}</span>
                </strong>
                <span class="measure">m/s</span>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      {{village}}
    </div>
    <!--강수확률: {{pop}}-->
    <!--온도: {{temp}}-->
    <!--날씨: {{wfKor}}-->
    <!--풍향: {{wdKor}}-->
    <!--풍속: {{ws}}-->
    <!--습도: {{reh}}-->
    <!--예상강수량: {{r12}}-->
    <!--이미지: {{wfImg}}-->

  </section>
</template>

<script>
  export default {
    name: "Info",
    props: {
      city: {
        type: String
      },
      country: {
        type: String
      },
      village: {
        type: String
      },
      leafCode: {
        type: Number
      },
      mdlName: {
        type: String
      },
      weather: {
        type: Object
      }
    },
    data() {
      return {
        prcp: '',   //강수량
        tc: '',     //온도
        tmax: '',   //최고온도
        tmin: '',   //최저온도
        wfKor: '',  //날씨한국어
        wdKor: '',  //풍향한국어
        wspd: '',   //풍속(m/s)
        humidity: '', //습도
        wfImg: '',    //날씨이미지
      }
    },
    watch: {
      village: function () {
        console.log('gdgd');
        console.log(this.weather)
       //this.setWeatherInfo();
       this.getCurrInfo();
       this.getStorm();
      }
    },
    methods: {
      setWeatherInfo: function () {

        console.log('hello');

        let today = this.weather[0];

        this.pop = today.pop[0];
        this.tc = today.tc[0];
        this.wfKor = today.wfKor[0];
        this.wdKor = today.wdKor[0];
        this.ws = Math.round(today.ws[0]*10)/10;
        this.reh = today.reh[0];
        this.r12 = today.r12[0];
        this.wfImg = this.$weather.getImageUrl2(today.wfEn[0].toLowerCase());
      },
      getCurrInfo: function() {
        console.log('------getCurrInfo-------')
        let weather = null;
        let url = '/api/weather/current/minutely?city=' + this.city + '&country=' + this.country + '&village=' + this.village;
        this.$http.get(url)
          .then((response) => {
            weather = response.data.weather.minutely[0];

            //상태
            let sky = weather.sky;
            this.wfImg = this.$weather.getAImage(sky.code);
            this.wfKor = sky.name;

            //온도
            let temp = weather.temperature;
            this.tc = Math.round(temp.tc);
            this.tmax = Math.round(temp.tmax);
            this.tmin = Math.round(temp.tmin);

            //습도
            this.humidity = Math.round(weather.humidity);

            //풍향
            let wind = weather.wind;
            this.wspd = Math.round(wind.wspd*10)/10;

            //강수량
            let precipitation = weather.precipitation;
            this.prcp = Math.round(precipitation.sinceOntime*10)/10;

          }).catch((error) => {
            console.error(error);
        });
      },
      getStorm: function(){
        let url = '/api/weather/forecast/storm';
        this.$http.get(url)
          .then((response) => {
            console.log(response)
          }).catch((error) => {
            console.error(error);
        });
      }

    },
    mounted() {
      console.log('쿠키 값을 가져온다')
      //쿠키값 세팅
      let _wCity = this.$cookie.get('_wCity');
      if (_wCity) {
        let wCity = _wCity.split('|');
        this.city = wCity[0];
        this.country = wCity[1];
        this.village = wCity[2];
      }
    }
  }
</script>

<style scoped>

</style>
