window.onload=function(){
    
    var password = document.getElementById("password"),
        loginbtn = document.getElementById("loginbtn");

    loginbtn.onclick = function() {
        if (window.XMLHttpRequest) {
            var xmlhttp = new XMLHttpRequest();
        } else {
            var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xmlhttp.open("POST", "action_login.php", true);

        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xmlhttp.send("password=" + password.value);

        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var loginstatus = xmlhttp.responseText;

                if (loginstatus == "success") {
                    alert("成功登陆");
                    window.location.href = "Verify.html";
                } else {
                    alert("密码错误，请重新输入");
                }
            }

        }

    }

}