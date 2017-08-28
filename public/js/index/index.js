/**
 * Created by 54939 on 2017/8/21.
 */

define(["echarts", "jquery"], function (echarts, $) {
  
  $.ajax({
    type: "get",
    url: "/api/dashboard",
    success: function (info) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(info);
    }
  });
  
  
});