<template>
    <div>
      <canvas ref="test" v-bind:width="150" v-bind:height="150"></canvas>
      <canvas ref="rect" v-bind:width="150" v-bind:height="150"></canvas>
      <canvas ref="path" v-bind:width="150" v-bind:height="150"></canvas>
      <canvas ref="qbc" v-bind:width="150" v-bind:height="150"></canvas>
      <div class="graph" id="graph">
        <my-canvas style="width: 100%; height: 600px;">
          <my-box
            v-for="(obj, index) in chartValues"
            :x1="((index / chartValues.length) * 100)"
            :x2="((index / chartValues.length) * 100) + (100 / chartValues.length)"
            :y1="100"
            :y2="100 - obj.val"
            :color="obj.color"
            :value="obj.val"
          >
          </my-box>
        </my-canvas>
      </div>
    </div>
</template>
<script>
import MyCanvas from './MyCanvas';
import MyBox from './MyBox';

    export default {
        name: "ExCanvas"
        ,
        components: {
          MyCanvas,
          MyBox
        },

        data() {
          return {
            chartValues: [
              {val: 24, color: '#94c0cf'},
              {val: 32, color: '#a17ccf'},
              {val: 66, color: '#3bcfb1'},
              {val: 1, color: '#5c68cf'},
              {val: 28, color: '#f8f9b6'},
              {val: 60, color: '#cf7384'},
            ]
          }
        },
        mounted: function() {   //모든 화면이 렌더링된 후 실행한다.
            //--------- canvas 예제
            let canvas = this.$refs['test'].getContext('2d');

            canvas.fillStyle = 'rgba(200,0,0, 0.5)';
            canvas.fillRect(0, 0, 50, 50);
            canvas.fillStyle = 'rgba(0,0,0, 1)';
            canvas.fillRect(50, 0, 50, 50);
            canvas.fillStyle = 'rgba(0, 200, 200, 0.5)';  //투명도
            canvas.fillRect(30, 30, 50, 50);

            //---------- Rect (사각형) 예제
            let rect = this.$refs['rect'].getContext('2d');
            rect.fillRect(25, 25, 100, 100);      //색칠된 직사각형
            rect.clearRect(37.5, 37.5, 75, 75);   //특정부분을 완전히 투명하게 지우는 직사각형
            rect.strokeRect(50, 50, 50, 50);      //직사각형 윤곽선

            //---------- Path (직사각형 외 원시적 primitive 도형) 예제
            let path = this.$refs['path'].getContext('2d');
          /**
           * 1. path만들기
           * 2. Drawing command를 이용하여 path에 그리기
           * 3. path닫기
           * 4. path가 한번 만들어지면, path를 렌더링하기 위해 윤곽선을 그리거나, 도형 내부를 채울 수 있다.
           */
            path.beginPath();                     //새로운 path를 생성
            path.moveTo(75, 50);
            path.lineTo(100, 75);
            path.lineTo(100, 25);
            path.fill();

            //----------- quadratic bezier curves(이차베이제곡선)
            let qbc = this.$refs['qbc'].getContext('2d');
            qbc.beginPath();
            qbc.moveTo(75, 25);
            qbc.quadraticCurveTo(25, 25, 25, 62.5);
            qbc.stroke();

            console.log('App.vue ㄱㄱ');
            let dir = 1;
            let selectedVal = Math.floor(Math.random() * this.chartValues.length);

            setInterval(() => {
              if (Math.random() > 0.995) dir *= -1;
              if (Math.random() > 0.99) selectedVal = Math.floor(Math.random() * this.chartValues.length);

              this.chartValues[selectedVal].val = Math.min(Math.max(this.chartValues[selectedVal].val + dir * 0.5, 0), 100);
            }, 16);
        }
    }
</script>
<style scoped>
</style>
