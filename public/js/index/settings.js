/**
 * Created by 54939 on 2017/8/22.
 */
define(["jquery", "template", "tool", "ckeditor", "uploadify", "jquery_region", "jquery_cookie"], function ($, template, tool, CKEDITOR) {
  
  $(function () {
    
    //发送请求渲染页面
    $.ajax({
      type: "get",
      url: "/api/teacher/profile",
      success: function (info) {
        if (info.code == 200) {
          var html = template("settings_tpl", info.result);
          $(".teacher-profile").html(html);
          tool.setDate("#tc_birthday");
          tool.setDate("#tc_join_date");
          
          //上传插件
          $("#upfile").uploadify({
            height: 120,
            swf: '/public/assets/uploadify/uploadify.swf',
            uploader: '/api/uploader/avatar',
            width: 120,
            fileObjName: "tc_avatar",
            buttonText: "",
            onUploadSuccess: function (file, data) {
              data = JSON.parse(data);
              //设置图片
              var path = data.result.path
              $(".preview img").attr("src", path);
              $("#userinfo img").attr("src", path);
              //设置cookie换掉图片
              var userinfo = $.cookie("userinfo");
              userinfo = JSON.parse(userinfo);
              userinfo.tc_avatar = path;
              $.cookie("userinfo", JSON.stringify(userinfo), {path: "/", expires: 1});
            }
          });
          //省市区三级联动功能
          $("#region").region({
            url: "/public/assets/jquery-region/region.json"
          })
          
          
          //富文本编辑器功能
          CKEDITOR.replace("tc_introduce", {
            toolbarGroups: [
              {name: 'clipboard', groups: ['clipboard', 'undo']},
              
              {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
              '/',
              {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
              {name: 'styles'},
              {name: 'colors'},
            ]
          });
        }
      }
    })
    
    
    $("body").on("click", ".btn_save", function () {
      //点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
      for (instance in CKEDITOR.instances) {
        CKEDITOR.instances[instance].updateElement();
      }
      
      //发送ajax
      $.ajax({
        type: "post",
        url: "/api/teacher/modify",
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            location.href = "/settings";
          }
        }
      })
    })
  })
  
  
})
