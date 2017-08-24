<?php 

header("Content-Type:application/json;charset=utf-8");

	if ($_SERVER["REQUEST_METHOD"] == "GET") {

		$topicid = $_GET["topicid"];

		$servername = "localhost";
		$username = "root";
		$password = "0769@unicom";
		$result = 0;

		try {

			$conn = new PDO("mysql:host=$servername;dbname=user", $username, $password);

			$conn->query("set names utf8;");

			$result = $conn->query("select * from commentlist where topicid = $topicid and verify = 1");

			$Arr = $result->fetchAll();

			if ($Arr) {
				echo json_encode($Arr);
			} else {
				echo "no comment";
			}

			$conn = null;

		} catch (PDOException $e) {
			echo $result . "<br>" . $e->getMessage();
		}
	} 


	if ($_SERVER["REQUEST_METHOD"] == "POST") {

		$topicid = $_POST["topicid"];
		$comment = $_POST["comment"];

		$servername = "localhost";
		$username = "root";
		$password = "0769@unicom";

		try {

			$conn = new PDO("mysql:host=$servername;dbname=user", $username, $password);

			//$result = $conn->query("update activitylist set likenum = likenum + 1 
										//where id = $id");

			$conn->query("set names utf8;");

			$result = $conn->query("insert into commentlist (topicid,comment) values ('$topicid','$comment')");

			if ($result) {
				//$result = $conn->query("select likenum from activitylist where id = $id");

				//$Arr = $result->fetchAll();

				echo "success";

				$conn = null;
			} else {
				//todo:返回错误，并退出
				echo "result=" . $result . " " . "topicid=" . $topicid . " " . "comment=" . "$comment";
				$conn = null;
			}
		} catch (PDOException $e) {
			echo $result . "<br>" . $e->getMessage();
		}
	}


 ?>