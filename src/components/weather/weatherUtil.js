import _img_sunny_gudegi from '../../assets/gudegi/gudegi2.png'
import _img_sunny from '../../assets/weather/sunny.png'
import _img_partly_cloudy from '../../assets/weather/partly_cloudy.png'
import _img_cloudy from '../../assets/weather/cloudy.png'
import _img_rain from '../../assets/weather/rain.png'
import _img_sleet from '../../assets/weather/sleet.png'
import _img_snow from '../../assets/weather/snow.png'

import SKY_W01 from '../../assets/weather/SKY_W01.png'
import SKY_W02 from '../../assets/weather/SKY_W02.png'
import SKY_W03 from '../../assets/weather/SKY_W03.png'
import SKY_W04 from '../../assets/weather/SKY_W04.png'
import SKY_W07 from '../../assets/weather/SKY_W07.png'
import SKY_W09 from '../../assets/weather/SKY_W09.png'
import SKY_W10 from '../../assets/weather/SKY_W10.png'
import SKY_W11 from '../../assets/weather/SKY_W11.png'
import SKY_W12 from '../../assets/weather/SKY_W12.png'
import SKY_W13 from '../../assets/weather/SKY_W13.png'


import SKY_A01 from '../../assets/weather/SKY_A01.png'
import SKY_A02 from '../../assets/weather/SKY_A02.png'
import SKY_A03 from '../../assets/weather/SKY_A03.png'
import SKY_A04 from '../../assets/weather/SKY_A04.png'
import SKY_A05 from '../../assets/weather/SKY_A05.png'
import SKY_A06 from '../../assets/weather/SKY_A06.png'
import SKY_A07 from '../../assets/weather/SKY_A07.png'
import SKY_A08 from '../../assets/weather/SKY_A08.png'
import SKY_A09 from '../../assets/weather/SKY_A09.png'
import SKY_A10 from '../../assets/weather/SKY_A10.png'
import SKY_A11 from '../../assets/weather/SKY_A11.png'
import SKY_A12 from '../../assets/weather/SKY_A12.png'
import SKY_A13 from '../../assets/weather/SKY_A13.png'
import SKY_A14 from '../../assets/weather/SKY_A14.png'


export default {
  install: (Vue) => {
    Vue.prototype.$weather = {
      getImageUrl(status) {

        let url = '';
        if (status == 'clear') {
          url = _img_sunny;
        } else if (status == 'partly cloudy') {
          url = _img_partly_cloudy;
        } else if (status == 'mostly cloudy') {
          url = _img_partly_cloudy;
        } else if (status == 'cloudy') {
          url = _img_cloudy;
        } else if (status == 'rain') {
          url = _img_rain;
        } else if (status == 'snow/rain') {
          url = _img_sleet;
        } else if (status == 'snow') {
          url = _img_snow;
        }
        return url;
      },
      getImageUrl2(status) {

        let url = '';
        if (status == 'clear') {
          url = _img_sunny_gudegi;
        } else if (status == 'partly cloudy') {
          url = _img_partly_cloudy;
        } else if (status == 'mostly cloudy') {
          url = _img_partly_cloudy;
        } else if (status == 'cloudy') {
          url = _img_cloudy;
        } else if (status == 'rain') {
          url = _img_rain;
        } else if (status == 'snow/rain') {
          url = _img_sleet;
        } else if (status == 'snow') {
          url = _img_snow;
        }
        return url;
      },


      /***
       * 현재예보 이미지
       * @param status
       * @returns {string}
       */
      getAImage(status) {
        let url = '';
        if (status == 'SKY_A01') {          //맑음
          url = SKY_A01;
        } else if (status == 'SKY_A02') {   //구름조금
          url = SKY_A02;
        } else if (status == 'SKY_A03') {   //구름많음
          url = SKY_A03;
        } else if (status == 'SKY_A04') {   //구름많고 비
          url = SKY_A04;
        } else if (status == 'SKY_A05') {   //구름많고 눈
          url = SKY_A05;
        } else if (status == 'SKY_A06') {   //구름많고 비 또는 눈
          url = SKY_A06;
        } else if (status == 'SKY_A07') {   //흐림
          url = SKY_A07;
        } else if (status == 'SKY_A08') {   //흐리고 비
          url = SKY_A08;
        } else if (status == 'SKY_A09') {   //흐리고 눈
          url = SKY_A09;
        } else if (status == 'SKY_A10') {   //흐리고 비 또는 눈
          url = SKY_A10;
        } else if (status == 'SKY_A11') {   //흐리고 낙뢰
          url = SKY_A11;
        } else if (status == 'SKY_A12') {   //뇌우/비
          url = SKY_A12;
        } else if (status == 'SKY_A13') {   //뇌우/눈
          url = SKY_A13;
        } else if (status == 'SKY_A14') {   //뇌우/비 또는 눈
          url = SKY_A14;
        }

        return url;
      },
      /***
       * 단기예보 이미지
       * @param status
       * @returns {string}
       */
      getSImage(status) {
        let url = '';
        if (status == 'SKY_S01') {          //맑음
          url = SKY_A01;
        } else if (status == 'SKY_S02') {   //구름조금
          url = SKY_A02;
        } else if (status == 'SKY_S03') {   //구름많음
          url = SKY_A03;
        } else if (status == 'SKY_S04') {   //구름많고 비
          url = SKY_A04;
        } else if (status == 'SKY_S05') {   //구름많고 눈
          url = SKY_A05;
        } else if (status == 'SKY_S06') {   //구름많고 비 또는 눈
          url = SKY_A06;
        } else if (status == 'SKY_S07') {   //흐림
          url = SKY_A07;
        } else if (status == 'SKY_S08') {   //흐리고 비
          url = SKY_A08;
        } else if (status == 'SKY_S09') {   //흐리고 눈
          url = SKY_A09;
        } else if (status == 'SKY_S10') {   //흐리고 비 또는 눈
          url = SKY_A10;
        } else if (status == 'SKY_S11') {   //흐리고 낙뢰
          url = SKY_A11;
        } else if (status == 'SKY_S12') {   //뇌우/비
          url = SKY_A12;
        } else if (status == 'SKY_S13') {   //뇌우/눈
          url = SKY_A13;
        } else if (status == 'SKY_S14') {   //뇌우/비 또는 눈
          url = SKY_A14;
        }

        return url;
      },
      /***
       * 중기예보 이미지
       * @param status
       * @returns {string}
       */
      getWImage(status) {
        let url = '';
        if (status == 'SKY_W01') {          //맑음
          url = SKY_A01;
        } else if (status == 'SKY_W02') {   //구름조금
          url = SKY_A02;
        } else if (status == 'SKY_W03') {   //구름많음
          url = SKY_A03;
        } else if (status == 'SKY_W04') {   //흐림
          url = SKY_A07;
        } else if (status == 'SKY_W07') {   //흐리고 비
          url = SKY_A08;
        } else if (status == 'SKY_W09') {   //구름많고 비
          url = SKY_A04;
        } else if (status == 'SKY_W10') {   //소나기
          url = SKY_A08;
        } else if (status == 'SKY_W11') {   //비 또는 눈
          url = SKY_A06;
        } else if (status == 'SKY_W12') {   //구름많고 눈
          url = SKY_A05;
        } else if (status == 'SKY_W13') {   //흐리고 눈
          url = SKY_A09;
        }

        return url;
      }
    }
  }
}
