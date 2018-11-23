<template>

</template>

<script>
  export default {
    name: "ddd",

    mounted() {
      console.log('canvasWidth> ' + this.canvasWidth);

      let daily = this.$refs['daily'].getContext('2d');

      daily.beginPath();
      //xy축
      daily.moveTo(50, 50);
      daily.lineTo(50, 450);
      daily.lineTo(935, 450);
      daily.stroke();

      //y축 눈금선
      daily.beginPath();
      daily.moveTo(50, 50);
      daily.lineTo(40, 50);
      daily.stroke();

      daily.beginPath();
      daily.moveTo(50, 150);
      daily.lineTo(40, 150);
      daily.stroke();

      daily.beginPath();
      daily.moveTo(50, 250);
      daily.lineTo(40, 250);
      daily.stroke();

      daily.beginPath();
      daily.moveTo(50, 350);
      daily.lineTo(40, 350);
      daily.stroke();

      daily.font = '15px sans-serif';
      daily.fillText('40℃', 0, 57);
      daily.fillText('30℃', 0, 157);
      daily.fillText('20℃', 0, 257);
      daily.fillText('10℃', 0, 357);

      let weather = null;
      let imgUrl = '/images/weather/';

      this.$http.get('/api/weather/chart')
        .then((response) => {
          weather = response.data.rss.channel[0].item[0].description[0].body[0].data;

          let preTemp = null;
          let postTemp = null;

          $.each(weather, function (idx, value) {
            let temp = value.temp;

            if (idx == 0) {
              postTemp = weather[idx + 1].temp;
            } else if (idx == weather.length - 1) {
              postTemp = null;
            } else {
              preTemp = weather[idx - 1].temp;
              postTemp = weather[idx + 1].temp;
            }

            //현재 시간 표시
            daily.fillText(value.hour, 97 + (100) * idx, 480);
            //내일 모래 표시
            if (value.hour == 24) {
              let after = '';
              if (value.day == 0) {
                after = '내일';
              } else if (value.day == 1) {
                after = '모래';
              }
              daily.fillText(after, 90 + (100) * idx, 500);
            }

            //온도
            daily.fillText(temp, 85 + (100) * idx, 470 - (temp) * 10);
            //상태
            daily.fillText(value.wfKor, 85 + (100) * idx, 430 - (temp) * 10);


            //이미지
            let img = new Image();


            let status = value.wfEn.toString().toLowerCase();
            //let status = value.wfEn.toLowerCase();

            if (status == 'clear') {
              img.src = imgUrl + 'sunny.png';
            } else if (status == 'partly cloudy') {
              img.src = imgUrl + 'partly_cloudy.png';
            } else if (status == 'mostly cloudy') {
              img.src = imgUrl + 'partly_cloudy.png';
            } else if (status == 'cloudy') {
              img.src = imgUrl + 'cloudy.png';
            } else if (status == 'rain') {
              img.src = imgUrl + 'rain.png';
            } else if (status == 'snow/rain') {
              img.src = imgUrl + 'sleet.png';
            } else if (status == 'rain') {
              img.src = imgUrl + 'snow.png';
            }
            /**
             *  날씨 코드 & 이미지 매핑
             *  clear -> sunny.png
             *  partly cloudy -> partly_cloudy.png
             *  mostly cloudy -> partly_cloudy
             *  cloudy -> cloudy
             *  rain -> rain
             *  snow/rain -> sleet
             *  snow  -> snow
             *
             */

            img.addEventListener("load", function () {
              daily.drawImage(img, 85 + (100) * idx, 30);
            }, false);


            //curves
            if (idx == 0) {
              daily.beginPath();
              daily.moveTo(100 + (100) * idx, 450 - (temp) * 10);
            } else if (idx == weather.length - 1) {
              daily.stroke();
            } else {
              if (preTemp <= temp && temp <= postTemp) {      // 직선
                daily.quadraticCurveTo(100 + 100 * idx, 450 - (temp) * 10, 100 + (100) * (idx + 1), 450 - (postTemp) * 10);
              } else if (preTemp >= temp && temp > postTemp) {  // 직선
                daily.quadraticCurveTo(100 + 100 * idx, 450 - (temp) * 10, 100 + (100) * (idx + 1), 450 - (postTemp) * 10);
              } else if (preTemp >= temp && temp < postTemp) {  // ∪
                daily.quadraticCurveTo(100 + 100 * idx, 450 - (temp) * 10, 100 + (100) * (idx + 1), 450 - (postTemp) * 10);
              } else if (preTemp <= temp && temp > postTemp) {  // ∩
                daily.quadraticCurveTo(100 + 100 * idx, 450 - (temp) * 10, 100 + (100) * (idx + 1), 450 - (postTemp) * 10);
              }
            }
          });


          $.each(weather, function (idx, value) {

            //x축 눈금선
            daily.beginPath();
            daily.moveTo(100 + 100 * idx, 450);
            daily.lineTo(100 + 100 * idx, 460);
            daily.stroke();

            let temp = value.temp;
            //점찍기
            daily.beginPath();
            daily.arc(100 + (100) * idx, 450 - (temp) * 10, 3, 0, 2 * Math.PI, true);
            daily.fill();

          });

        }).catch((error) => {
        console.error(error);
      });
    }
  }

</script>

<style scoped>

</style>
