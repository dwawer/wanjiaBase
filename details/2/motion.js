 window.onload=function(){
      	var comment_btn=document.getElementById('write-comment'),
      	    close=document.getElementById('close'),
            back_btn=document.getElementById('back-btn');


        back_btn.onclick = function() {
          window.location.href = '../../index.html';
        }

        comment_btn.onclick = function() {
          oMask.style.display = 'block';
        }

        //弹窗
        var addMask = document.getElementById("addImg");

     //function bigPicFun(ele) {
            //获取页面的高度和宽度
            var sHeight = document.documentElement.scrollHeight;
            var sWidth = document.documentElement.scrollWidth;

            //获取可视区域的高度
            var wHeight = document.documentElement.clientHeight;
            var wWidth = document.documentElement.clientWidth;

            var oMask = document.getElementById('mask');

            oMask.style.display = "block";
            oMask.style.visibility = "hidden";

            oMask.style.height = sHeight + "px";
            oMask.style.width = sWidth + "px";

            var imgDiv = document.getElementById('imgdiv')

            //获取PicDiv的宽度和高度
            var dHeight = imgDiv.offsetHeight;
            var dWidth = imgDiv.offsetWidth;

            imgDiv.style.left = (wWidth - dWidth) / 2 + "px";
            imgDiv.style.top = (wHeight - dHeight) / 2 + "px";

            var oBtnclose = document.getElementById("close");
              oMask.onclick = oBtnclose.onclick = function() {
              oMask.style.display = 'none';
            }

            //取消冒泡
              imgDiv.onclick = function(event) {
                event = event || window.event;
      
                if (event.stopPropagation) {
                  event.stopPropagation();
                } else {
                  event.cancelBubble=true;
                }
              }

            var oBtnsub = document.getElementById('maskbtn');
              oBtnsub.onclick = function(event) {
                //todo
                uploadcomment(2);
                oMask.style.display = 'none';
            }

         // }
          oMask.style.display = "none";
          oMask.style.visibility = "visible";

          loadcomment(2);

};


//加载评论事件
    function loadcomment(arg) {
        if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
        } else {
            var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //xmlhttp.open("POST", "action_like.php", true);
        xmlhttp.open("GET", "action_comment.php?topicid=" + arg);

        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        //xmlhttp.send("id="+arg);
        xmlhttp.send();

        //todo:更新点赞数量
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var commentArg = JSON.parse(xmlhttp.responseText);
                //JSON.parse
                if (commentArg == "no comment") {
                    alert("获取评论失败，请检查网络连接是否畅通");
                    console.log(commentArg);
                } else {
                    //document.getElementsByName('likenum')[arg-1].innerHTML = commentArg[0].likenum;
                    console.log(commentArg.length);

                    for (var i = 0; i < commentArg.length; i++) {

                      var com = document.getElementById("comment-area");
                          hr = document.createElement("div");
                          comarea = document.createElement("div");
                          phoarea = document.createElement("div");
                          pho = document.createElement("img");
                          comdetail = document.createElement("div");
                          user = document.createElement("p");
                          text = document.createElement("p");

                          hr.className = "hr hr-com";
                          comarea.className =  "comment";
                          phoarea.className = "photo-area";
                          pho.src = "/static/findActivity/photo.jpg";
                          comdetail.className = "comment-detail";
                          user.className = "user";
                          text.className = "text";

                          phoarea.appendChild(pho);
                          comdetail.appendChild(user);
                          comdetail.appendChild(text);
                          comarea.appendChild(phoarea);
                          comarea.appendChild(comdetail);
                          com.appendChild(comarea);
                          com.appendChild(hr);

                          user.innerHTML = "用户" + commentArg[i].commentid;
                          text.innerHTML = commentArg[i].comment;


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

