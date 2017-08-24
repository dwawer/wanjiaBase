<?php 

	header("Content-Type:application/json;charset=utf-8");

	if ($_SERVER["REQUEST_METHOD"] == "POST") {

		$id = $_POST["id"];

		$servername = "localhost";
		$username = "root";
		$password = "0769@unicom";

		try {

			$conn = new PDO("mysql:host=$servername;dbname=user", $username, $password);

			$result = $conn->query("update activitylist set likenum = likenum + 1 
										where id = $id");

			if ($result) {
				$result = $conn->query("select likenum from activitylist where id = $id");

				$Arr = $result->fetchAll();

				echo json_encode($Arr);

				$conn = null;
			} else {
				//todo:返回错误，并退出
				echo "error";
				$conn = null;
			}
		} catch (PDOException $e) {
			echo $result . "<br>" . $e->getMessage();
		}
	}

 ?>