export default {
  install: (Vue) => {
    Vue.prototype.$date = {

      getDayOfWeek (date) {
        let week = ['일', '월', '화', '수', '목', '금', '토'];
        let dayOfWeek = week[date.getDay()];
        return dayOfWeek;
      },
      getMonthDay (date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [month, day].join('/')
      },
      getHourMinutes (date){
        let hour = ''+date.getHours();
        let min = ''+date.getMinutes();

        if (hour.length < 2) hour = '0' + hour;
        if (min.length < 2) min = '0' + min;
``
        return [hour, min].join(':')
      }
    }
  }
}
