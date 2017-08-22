/**
 * Created by 54939 on 2017/8/21.
 */

define(["jquery", "jquery_cookie", "jquery_form"], function ($) {
  $(function () {
    $("form").submit(function () {
      $(this).ajaxSubmit({
        type: "post",
        url: "/api/login",
        success: function (info) {
          if (info.code == 200) {
            //在跳转之前要把info的result存入到cookie
            var userinfo = JSON.stringify(info.result)
            $.cookie("userinfo", userinfo, {path: "/", expires: 1})
            location.href = "/";
          }
        }
      });
      return false;
    });
  });
});
