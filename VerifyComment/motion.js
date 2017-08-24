 window.onload=function(){

          loadcomment();

};


  var commentid = new Array();

//加载评论事件
    function loadcomment() {
        if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
        } else {
            var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //xmlhttp.open("POST", "action_like.php", true);
        xmlhttp.open("GET", "action_verify.php");

        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        //xmlhttp.send("id="+arg);
        xmlhttp.send();

        //todo:更新点赞数量
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //JSON.parse
                if (xmlhttp.responseText == "no comment") {
                    alert("获取评论失败，请检查网络连接是否畅通");
                    console.log(xmlhttp.responseText);
                } else {
                    //document.getElementsByName('likenum')[arg-1].innerHTML = commentArg[0].likenum;
                    var commentArg = JSON.parse(xmlhttp.responseText);
                    console.log(commentArg.length);
                    for (var i = 0; i < commentArg.length; i++) {

                      var com = document.getElementById("comment-area");
                          hr = document.createElement("div");
                          comarea = document.createElement("div");
                          phoarea = document.createElement("div");
                          btnarea = document.createElement("div");
                          pho = document.createElement("img");
                          comdetail = document.createElement("div");
                          user = document.createElement("p");
                          text = document.createElement("p");
                          topic = document.createElement("p");
                          pass = document.createElement("button");
                          dele = document.createElement("button");

                          hr.className = "hr hr-com";
                          comarea.className =  "comment";
                          phoarea.className = "photo-area";
                          btnarea.className = "buttonarea";
                          pho.src = "/static/findActivity/photo.jpg";
                          comdetail.className = "comment-detail";
                          user.className = "user";
                          text.className = "text";
                          topic.className = "topic";
                          pass.className = "pass oneline";
                          dele.className = "delete oneline";
                          pass.name = "pass";
                          dele.name = "delete";
                          pass.innerHTML = "通过";
                          dele.innerHTML = "删除";

                          phoarea.appendChild(pho);
                          comdetail.appendChild(user);
                          comdetail.appendChild(text);
                          comdetail.appendChild(topic);
                          btnarea.appendChild(pass);
                          btnarea.appendChild(dele);
                          comarea.appendChild(phoarea);
                          comarea.appendChild(comdetail);
                          comarea.appendChild(btnarea);
                          com.appendChild(hr);
                          com.appendChild(comarea);

                          user.innerHTML = "用户" + commentArg[i].commentid;
                          text.innerHTML = commentArg[i].comment;
                          topic.innerHTML = "来自主题" + commentArg[i].topicid;

                          commentid.push(commentArg[i].id);

                          (function(arg) {
                            addlistener(arg, pass, dele, hr, comarea);
                          })(i);


                    }

                    console.log(commentArg);
                }
            }
        }
        
    }


    //上传评论事件
    function uploadcomment(arg) {
        
        if (window.XMLHttpRequest) {
          var xmlhttp = new XMLHttpRequest();
        } else {
          var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.open("POST", "action_comment.php", true);

        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        var text = document.getElementById("maskinput").value;

        xmlhttp.send('topicid='+ arg + '&comment=' + text);

        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 & xmlhttp.status == 200) {
            var commentArg = xmlhttp.responseText;

            if (commentArg == "success") {
              alert("成功提交评论，请待审核通过");
            } else {
              alert("评论提交失败，请检查您的网络是否通畅");
              console.log(commentArg);
            }

          }
        }

    }


    function addlistener(arg, p, d, h, c) {
        p.onclick = function() {
          //todo 

          if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
          } else {
            var xmlhttp = ActiveXObject("Microsoft.XMLHTTP");
          }

          xmlhttp.open("POST","action_verify.php",true);

          xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

          xmlhttp.send('id=' + commentid[arg] + '&type=pass');

          xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              if (xmlhttp.responseText == "pass success") {
                alert("通过id为"+commentid[arg]+"的评论"); 
                h.parentNode.removeChild(h);
                c.parentNode.removeChild(c);

              } else {
                alert("通过失败，请检查网络");
              }
            }
          }

        }

        d.onclick = function() {
          //todo

          if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
          } else {
            var xmlhttp = ActiveXObject("Microsoft.XMLHTTP");
          }

          xmlhttp.open("POST","action_verify.php",true);

          xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

          xmlhttp.send('id=' + commentid[arg] + '&type=delete');

          xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              if (xmlhttp.responseText == "delete success") {
                alert("删除id为"+commentid[arg]+"的评论");
                h.parentNode.removeChild(h);
                c.parentNode.removeChild(c);

              } else {
                alert("通过失败，请检查网络");
              }
            }
          }
        }
    }

