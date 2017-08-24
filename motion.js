
window.onload= function() {

    onStart();

	//点击事件
	var item = document.getElementsByName('item');

	for (var i = 0; i < item.length; i++) {
		addAListener(item[i],i);
	}


    var like = document.getElementsByName('like');
    for (var i = 0; i < like.length; i++) {
	    (function(arg) {
            like[arg].onclick = function(event) {

	    	    event = event || window.event;

	    	    if (event.stopPropagation) {
	    	        event.stopPropagation();
	    	    } else {
	    	        event.cancelBubble = true;
	    	    }

                clicklike(arg+1);
	        };

        })(i);

	}
};

var islike = new Array();

//为首页添加项
    function onStart() {

        var content = document.getElementById('content');

        if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xmlhttp.open('GET', 'action_start.php');
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dataBack = JSON.parse(xmlhttp.responseText);

                for(var i = 0; i < dataBack.length; i++) {
                    //todo:按照数据库建立列表
                    var item = document.createElement('div'),
                        itemImg = document.createElement('img'),
                        hr = document.createElement('div'),
                        itemText = document.createElement('p'),
                        like = document.createElement('button'),
                        likeNum = document.createElement('p');

                    item.className = 'item',
                    itemImg.className = 'item-img',
                    hr.className = 'hr',
                    itemText.className = 'item-text',
                    like.className = 'like',
                    likeNum.className = 'likeNum';
                    likeNum.setAttribute('name', 'likenum');


                    itemImg.src = dataBack[i].imgsrc;
                    itemText.innerHTML = dataBack[i].introduction;
                    likeNum.innerHTML = dataBack[i].likenum;
                    like.innerHTML = '点赞';

                    item.appendChild(itemImg);
                    item.appendChild(hr);
                    item.appendChild(itemText);
                    item.appendChild(like);
                    item.appendChild(likeNum);

                    addAListener(item, i);
                    content.appendChild(item);

                    islike.push(1);

                    //button取消冒泡
                    (function(arg, i) {
                        like.onclick = function(event) {
                            event = event || window.event;

                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else {
                                event.cancelBubble = true;
                            }

                            //todo:添加点赞事件
                            if (islike[i]) {
                                clicklike(arg, i);
                                islike[i] = 0;
                            } else {
                                alert("只能点赞一次哦");
                            }

                        }
                    })(dataBack[i].id, i);

                    
                }
            }
        }
    }


//点击及触摸事件
function addAListener(item,i) {
    item.onmousedown = function() {
            this.style.background = '#BEBEBE';
        };

        item.onclick = (function (arg) {
            return function() {
                window.location.href = "details/" + arg + "/detail.html";
            }
        })(i+1);

        item.onmouseup = function() {
            this.style.background = '#fff';
        };

        item.onmouseout = function() {
            this.style.background = '#fff';
        };

        item.addEventListener('touchstart',touch, false);  
        item.addEventListener('touchmove',touch, false);  
        item.addEventListener('touchend',touch, false); 
}

//触摸事件
    function touch (event){  
        var event = event || window.event;    
   
        switch(event.type){  
            case "touchstart":  
                this.style.background = '#BEBEBE'; 
                break;  
            case "touchend":  
                this.style.background = '#fff';
                break;  
            case "touchmove":  
                event.preventDefault();  
                this.style.background = '#BEBEBE';  
                break;  
        }  
           
    }


    //点赞事件
    function clicklike(arg, i) {
        if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
        } else {
            var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xmlhttp.open("POST", "action_like.php", true);

        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        xmlhttp.send("id="+arg);

        //todo:更新点赞数量
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var likeNumArg = JSON.parse(xmlhttp.responseText);
                if (likeNumArg == "error") {
                    alert("点赞失败，请检查网络连接是否畅通");
                } else {
                    var likenum = document.getElementsByName('likenum');
                    likenum[i].innerHTML = likeNumArg[0].likenum;
                    likenum[i].style.color = 'red';
                }
            }
        }
        
    }