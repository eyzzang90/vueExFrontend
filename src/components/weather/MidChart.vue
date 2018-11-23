<template>

  <div width="100%" style="text-align: center">
    <div style="position:  relative;margin:  0 auto;">
      <span style="float:right;  right: -0px;">오늘: {{timeRelease}}</span>
    </div>
    <br>
    <div id="chartContainer" style="display:  inline-block; width:100%; height:330px; margin-left: auto; margin-right: auto;">
      <!--<canvas ref="canvas" class="canvas" v-bind:width="800" v-bind:height="550" style="display: none"></canvas>-->
      <!--<canvas ref="chart" class="canvas" v-bind:width="2100" v-bind:height="550"></canvas>-->
      <canvas ref="midChart" class="canvas" :width="width" :height="height"></canvas>
      <div class="temp-tooltip" :style="{bottom: bottom, left:left}" v-if="wfKor != null">
        <div class="temp-info"><strong>{{wfKor}}</strong><br><span style="color:#ca5977;">{{temp}}˚</span></div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "MidChart",
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
        width: 1000,
        height: 300,
        isMob: false,
        weather: null,
        count: 14,
        temp: 0,
        wfKor: null,
        bottom: '351px',
        left: '0px',
        timeRelease: ''
      }
    },
    watch: {
      village: function () {
        let chart = this.$refs['midChart'].getContext('2d');
        chart.clearRect(0, 0, this.$refs['midChart'].width, this.$refs['midChart'].height);
        this.getMdlChart();
      }
    },
    methods: {
      listener: function (event) {
        let x, y;
        switch (event.type) {
          case 'mousedown':
            x = event.pageX - this.$refs['midChart'].offsetLeft;
            y = event.pageY - this.$refs['midChart'].offsetTop;
            console.log('x: ' + x + ', y: ' + y);
            break;
        }
      },

      getMdlChart: function () {

        let chart = this.$refs['midChart'].getContext('2d');
        this.$refs['midChart'].addEventListener('mousedown', this.listener);

        chart.font = '15px sans-serif';
        chart.fillStyle = '#000000';


        let diff, min, minLine, digit, maxX, maxY, start;


        let width = this.width;
        let height = this.height;

        if (this.isMob) {
          diff = 100 / 3 * 2;
          //diff = 30;
          min = (height / 11);
          minLine = 40 / 3 * 2;
          digit = 5 / 3 * 2;
          start = 60 / 3 * 2;
        } else {
          diff = 10;
          min = (height / 11);
          minLine = 40;
          digit = 5;
          start = 110;
        }

        maxY = height
        maxX = width - digit;

        //-------------------------------------------canvas draw start--------------------------------------

        let weather = null;

        let url = '/api/weather/forecast/6days?city=' + this.city + '&country=' + this.country + '&village=' + this.village;
        this.$http.get(url)
          .then((response) => {
            weather = response.data.weather.forecast6days[0];
            let sky = weather.sky;
            let temperature = weather.temperature;
            let timeRelease = weather.timeRelease;



            /** ====================================================
             *                날짜 포맷
             =======================================================*/
            let date = new Date(timeRelease)

            //오늘날짜 표기
            this.timeRelease = this.$date.getDayOfWeek(date)+'요일'

            //차트내에 날짜 표기
            date.setDate(date.getDate()+2);
            let cnt = 1;
            chart.lineWidth = 1;
            chart.fillStyle = '#000000';

            for(let idx = 0; idx < 9; idx++){

              if(idx == 0) date.setDate(date.getDate());
              else date.setDate(date.getDate()+cnt);

              let dayOfWeek = this.$date.getDayOfWeek(date);
              let monthDay = this.$date.getMonthDay(date);

              if(dayOfWeek) chart.fillText(dayOfWeek+'요일', diff +15+ start * (idx), maxY - (140) * 2);
              if(monthDay)  chart.fillText('('+monthDay+')', diff +15+ start * (idx), maxY - (130) * 2);

            }

            /** ====================================================
             *                상태 이미지
             =======================================================*/

            //am
            for (let idx = 0; idx < 9; idx++) {

              let _amCkey = 'amCode' + (idx + 2) + 'day';
              let amCkey = sky[_amCkey];

              let img = new Image();
              img.src = this.$weather.getWImage(amCkey);
              img.addEventListener("load", function () {
                chart.drawImage(img, diff + start * (idx), maxY - (110) * 2, minLine, minLine);
              }, false);
              chart.fillText('오전', diff + start * (idx), maxY - (110) * 2);
            }

            //pm
            for (let idx = 0; idx < 9; idx++) {

              let _pmkey = 'pmCode' + (idx + 2) + 'day';
              let pmCkey = sky[_pmkey];

              let img = new Image();
              img.src = this.$weather.getWImage(pmCkey);
              img.addEventListener("load", function () {
                chart.drawImage(img, diff + start * (idx) + minLine, maxY - (110) * 2, minLine, minLine);
              }, false);
              chart.fillText('오후', diff + start * (idx) + minLine, maxY - (110) * 2);
            }


            /** ====================================================
             *                기온
             =======================================================*/



            //최 고/저기온 평균값
            let avgMin = 0;   //
            let avgMax = 0;

            for (let idx = 2; idx < 11; idx++) {

              let _tmax = 'tmax' + idx + 'day';
              let _tmin = 'tmin' + idx + 'day';
              let tmax = temperature[_tmax];
              let tmin = temperature[_tmin];

              avgMax += parseInt(tmax);
              avgMin += parseInt(tmin);
            }
            avgMax = Math.round(avgMax / 9);
            avgMin = Math.round(avgMin / 9);

            let baseMax = 130;
            let baseMin = 70;

            //최고기온 line
            chart.strokeStyle = '#ff4933';
            for (let idx = 0; idx < 9; idx++) {
              let _tmax = 'tmax' + (idx+2) + 'day';
              let tmax = temperature[_tmax];
              if (idx == 0) {
                chart.beginPath();                //약 170 => 130
                chart.moveTo(diff+35 + start * idx , maxY - baseMax - (tmax-avgMax)* 10);
              } else if (idx == 8) {
                chart.lineTo(diff+35 + start * idx, maxY - baseMax - (tmax-avgMax)* 10);
                chart.stroke();
              } else {
                chart.lineTo(diff+35 + start * idx, maxY - baseMax - (tmax-avgMax)* 10);
                chart.moveTo(diff+35 + start * idx, maxY - baseMax - (tmax-avgMax)* 10);
              }
            }

            //최저기온 line
            chart.strokeStyle = '#3aabd0';
            for (let idx = 0; idx < 9; idx++) {
              let _tmin = 'tmin' + (idx+2) + 'day';
              let tmin = temperature[_tmin];
              if (idx == 0) {
                chart.beginPath();
                chart.moveTo(diff+35 + (start) * idx, maxY - baseMin - (tmin-avgMin)* 10);
              } else if (idx == 8) {
                chart.lineTo(diff+35 + start * idx, maxY - baseMin - (tmin-avgMin)* 10);
                chart.stroke();
              } else {
                chart.lineTo(diff+35 + start * idx, maxY - baseMin - (tmin-avgMin)* 10);
                chart.moveTo(diff+35 + (start) * idx, maxY - baseMin - (tmin-avgMin)* 10);
              }
            }

            //chart dot

            for (let idx = 2; idx < 11; idx++) {

              let _tmax = 'tmax' + idx + 'day';
              let _tmin = 'tmin' + idx + 'day';

              let tmax = temperature[_tmax];
              let tmin = temperature[_tmin];


              //최고
              chart.beginPath();
              chart.arc(diff+35 + (start) * (idx - 2), maxY - baseMax - (tmax-avgMax) * 10, 3, 0, 2 * Math.PI, true);
              chart.fillStyle = '#ff4933';
              chart.fill();

              chart.fillText(tmax + '˚', diff+35 + (start) * (idx - 2), maxY - baseMax - (tmax-avgMax) * 10- 30 + (minLine / 2) );


              //최저
              chart.beginPath();
              chart.arc(diff+35 + (start) * (idx - 2), maxY - baseMin - (tmin-avgMin) * 10, 3, 0, 2 * Math.PI, true);
              chart.fillStyle = '#3aabd0';
              chart.fill();

              chart.fillText(tmin + '˚', diff+35 + (start) * (idx - 2), maxY - baseMin - (tmin-avgMin) * 10+ (minLine / 2));

            }

          }).catch((error) => {
          console.error(error);
        });
      }
    },
    mounted() {

      let _wCity = this.$cookie.get('_wCity');
      if (_wCity) {
        let wCity = _wCity.split('|');
        this.city = wCity[0];
        this.country = wCity[1];
        this.village = wCity[2];
        this.getMdlChart();
      }


    }
  }
</script>

<style scoped>
  #chartContainer {
    overflow-x: auto;
    width: 100%;
    background: #a4cae833;
  }
</style>
