import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie';
import WeatherUtil from '../components/weather/weatherUtil';
import DateUtil from '../components/common/dateUtil';

Vue.use(Router)
Vue.use(VueCookie)
Vue.use(WeatherUtil);
Vue.use(DateUtil);

import Main from '../components/Main'
import Index from '../components/movie/IndexPage'
import Show from '../components/movie/ShowPage'
import Weather from '../components/weather/Weather'
import Canvas from '../components/canvas/ExCanvas'
import Tournament from '../components/tournament/Tournament'


export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/movie',
      name: 'index',
      component: Index
    },
    {
      path: '/movie/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: Canvas
    },
    {
      path: '/tournament',
      name: 'tournament',
      component: Tournament
    }
  ],
  mode: 'history'
})
