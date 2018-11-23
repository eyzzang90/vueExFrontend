<template>
  <div width="100%" style="text-align: center">
    <div id="chartContainer"
         style="display:  inline-block; width:100%; height:330px; margin-left: auto; margin-right: auto;">
      <div>빌리지:{{village}}</div>
      <canvas ref="chart" class="canvas" :width="width" :height="height"></canvas>
      <div class="temp-tooltip" :style="{bottom: bottom, left:left}" v-if="wfKor != null">
        <!--<div class="temp-tooltip">-->
        <div class="temp-info"><strong>{{wfKor}}</strong><br><span style="color:#ca5977;">{{temp}}℃</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Chart",
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
        type: String
      },
      mdlName: {
        type: String
      }
    },
    data() {
      return {
        width: 940,   //940  , 666
        height: 300,    //550 , 330
        isMob: false,
        weather: null,
        count: 14,
        temp: 0,
        wfKor: null,
        bottom: '351px',
        left: '0px'
      }
    },
    props: {
      leafCode: {
        type: String
      }
    },
    watch: {
      village: function () {
        this.refreshChart();
      }
    },
    methods: {
      listener: function (event) {
        let x, y;
        switch (event.type) {
          case 'mousedown':
            x = event.pageX - this.$refs['chart'].offsetLeft;
            y = event.pageY - this.$refs['chart'].offsetTop;
            console.log('x: ' + x + ', y: ' + y);
            break;
          case 'mousemove':
            x = event.pageX - this.$refs['chart'].offsetLeft;
            y = event.pageY - this.$refs['chart'].offsetTop;
            //console.log('x: ' + x + ', y: ' + y);

            for (let idx = 0; idx < this.count; idx++) {
              let temp = this.weather[idx].temp[0];
              let wfKor = this.weather[idx].wfKor[0];


              //온도
              let min = this.height / 11;
              let maxY = this.height - (min * 2)
              let digit = 5;
              let gt = 85;
              let start = 60;

              let tempXmin = (gt + (start) * idx) - 24;
              let tempXmax = (gt + (start) * idx) + 25;
              let tempYmin = (maxY - (temp) * digit * 2) - 24;
              let tempYmax = (maxY - (temp) * digit * 2) + 25;

              if (x >= tempXmin && x <= tempXmax && y >= tempYmin && y <= tempYmax) {
                this.temp = temp;
                this.wfKor = wfKor;
                this.bottom = this.width - ((maxY - (temp) * digit * 2)) - 430 + 'px'
                this.left = (gt + (start) * idx - 25) + 'px'
              }
            }

            break;
        }
      },

      refreshChart: function () {

        let chart = this.$refs['chart'].getContext('2d');
        chart.clearRect(0, 0, this.$refs['chart'].width, this.$refs['chart'].height);

        let url = '/api/weather/forecast/3days?city=' + this.city + '&country=' + this.country + '&village=' + this.village;
        this.drawChart(url, chart);
      },
      drawChart: function (url, chart) {

        chart.font = '15px sans-serif';

        let diff, min, minLine, digit, maxX, maxY, start, add, gt, bottomStart, marginY;
        let width = this.width;
        let height = this.height;



        if (this.isMob) {
          diff = 100 / 3 * 2;
          minLine = 40 / 3 * 2;
          start = 60 / 3 * 2;
        } else {
          diff = 50;
          minLine = 40;
          start = 60;
        }

        maxY = height;

        //-------------------------------------------canvas draw start--------------------------------------


        let weather = null;
        //let count = 14;        //총 날씨 노출 갯수

        this.$http.get(url)
          .then((response) => {
            weather = response.data.weather.forecast3days[0];

            if(weather){

              let timeRelease = weather.timeRelease;
              let fcst3hour = weather.fcst3hour;

              //시간
              for (let idx = 0; idx < 19; idx++) {
                let val = 3 * idx + 4;
                let date = new Date(timeRelease);
                date.setHours(date.getHours() + val);

                let time = this.$date.getHourMinutes(date)

                chart.fillText(time, diff + (start) * idx, maxY - (130) * 2);

                //내일 모래
                if (time == '00:00') {

                  let after1, after2, after3;
                  let newDate = new Date(timeRelease);
                  let today = this.$date.getMonthDay(date);

                  newDate.setDate(newDate.getDate() + 1)
                  after1 = this.$date.getMonthDay(newDate);

                  newDate.setDate(newDate.getDate() + 1)
                  after2 = this.$date.getMonthDay(newDate);

                  newDate.setDate(newDate.getDate() + 1)
                  after3 = this.$date.getMonthDay(newDate);

                  let after = '';

                  if (today == after1) {
                    after = '내일';
                  } else if (today == after2) {
                    after = '모레';
                  } else if (today == after3) {
                    after = '글피';
                  }
                  chart.fillText(after, diff + (start) * idx, maxY - (140) * 2);
                }
              }

              //상태
              let sky = fcst3hour.sky;

              for (let idx = 0; idx < 19; idx++) {
                let val = 3 * idx + 4;
                let _sky = 'code' + val + 'hour';
                let skyc = sky[_sky];

                let img = new Image();
                img.src = this.$weather.getSImage(skyc);
                img.addEventListener('load', function () {
                  chart.drawImage(img, diff + (start) * idx, maxY - (120) * 2, minLine, minLine);
                }, false);

              }

              let avgTemp = 0;
              let base = 110;
              //온도
              let temp = fcst3hour.temperature;

              for (let idx = 0; idx < 19; idx++) {
                let val = 3 * idx + 4;
                let _temp = 'temp' + val + 'hour';
                let tc = Math.round(temp[_temp]);

                avgTemp += parseInt(tc);
              }
              avgTemp = Math.round(avgTemp / 19);

              for (let idx = 0; idx < 19; idx++) {
                let val = 3 * idx + 4;
                let _temp = 'temp' + val + 'hour';
                let tc = Math.round(temp[_temp]);


                //line
                if (idx == 0) {
                  chart.beginPath();
                  chart.moveTo(diff + start * idx, maxY - base - (tc - avgTemp) * 10);
                } else if (idx == 18) {
                  chart.lineTo(diff + start * idx, maxY - base - (tc - avgTemp) * 10);
                  chart.stroke();
                } else {
                  chart.lineTo(diff + start * idx, maxY - base - (tc - avgTemp) * 10);
                  chart.moveTo(diff + start * idx, maxY - base - (tc - avgTemp) * 10);
                }
              }

              //점찍기
              for (let idx = 0; idx < 19; idx++) {

                let val = 3 * idx + 4;
                let _temp = 'temp' + val + 'hour';
                let tc = Math.round(temp[_temp]);

                //온도
                chart.fillText(tc+'˚', diff + start * idx -5, maxY - base -10 - (tc - avgTemp) * 10);

                chart.beginPath();
                chart.arc(diff + start * idx, maxY - base - (tc - avgTemp) * 10, 3, 0, 2 * Math.PI, true);
                chart.fill();
              }

              //습도
              this.humidity = fcst3hour.humidity;

              //풍향
              let wind = fcst3hour.wind;
              this.wspd = Math.round(wind.wspd * 10) / 10;

              //강수확률
              let precipitation = fcst3hour.precipitation;

              for (let idx = 0; idx < 19; idx++) {
                let val = 3 * idx + 4;
                let _prcp = 'prob' + val + 'hour';
                let prcp = Math.round(precipitation[_prcp]*10)/10+'%';

                console.log(prcp)
                chart.fillText(prcp, diff + (start) * idx, maxY - (10) * 2);
              }

              this.$emit('weather', this.weather);
            }else{
              console.log('weather가 없습니다.')
            }

          }).catch((error) => {
          console.error(error);
        });
      }
    },

    mounted() {
      let chart = this.$refs['chart'].getContext('2d');

      this.$refs['chart'].addEventListener('mousedown', this.listener);
      // this.$refs['chart'].addEventListener('mousemove', this.listener);


      //쿠키값 세팅
      let _wCity = this.$cookie.get('_wCity');
      if (_wCity) {
        let wCity = _wCity.split('|');
        this.city = wCity[0];
        this.country = wCity[1];
        this.village = wCity[2];

        let url = '/api/weather/forecast/3days?city=' + this.city + '&country=' + this.country + '&village=' + this.village;

        this.drawChart(url, chart);
      }
    }

  }

</script>

<style scoped>

  .canvas {
    /*width: 100%;*/
  }

  #chartContainer {
    overflow-x: auto;
    width: 100%;
    background: #a4cae833;
  }

  .temp-tooltip {
    display: inline-block;
    position: relative;
    height: auto;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px 2px;
    z-index: 1000;
    pointer-events: none;
    border-radius: 0px;
    transition: left 0.1s ease-out 0s, bottom 0.1s ease-out 0s;
    float: left;
  }

  .temp-info {
    width: auto;
    height: auto;
    min-width: 50px;
    margin: 0px;
    padding: 5px;
    font-family: Helvetica, sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
    color: black;
    text-shadow: rgba(0, 0, 0, 0.1) 1px 1px 1px;
    text-align: left;
    border: 1px solid rgb(119, 153, 223);
    background: rgba(237, 250, 255, 0.9);
    text-indent: 0px;
    white-space: nowrap;
    border-radius: 0px;
    user-select: none;
  }

</style>
