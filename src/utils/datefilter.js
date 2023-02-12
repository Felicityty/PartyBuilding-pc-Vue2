import Vue from 'vue'
import moment from "moment"

Vue.filter('dateFilter', (data) => {
  // 日期处理函数 - moment
  if (data !== '' && data !== null && data !== undefined) {
    return moment(data).format('YYYY-MM-DD')
  }else {
    return data
  }
})