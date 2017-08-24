/**
 * Created by 54939 on 2017/8/22.
 */
define(["jquery", "template"], function ($, template) {
  $(function () {
    $.ajax({
      type: "get",
      url: "/api/category",
      success: function (info) {
        if (info.code == 200) {
          var html = template("category_list_tpl", info);
          $("tbody").html(html);
        }
      }
    });
  });
 
})