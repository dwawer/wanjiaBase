<?php 

	header("Content-Type:application/json;charset=utf-8");

	if ($_SERVER["REQUEST_METHOD"] == "GET") {

		$servername = "localhost";
		$username = "root";
		$password = "0769@unicom";
		$result = 0;

		try {

			$conn = new PDO("mysql:host=$servername;dbname=user", $username, $password);

			$conn->query("set names utf8;");

			$result = $conn->query("select * from activitylist");

			$Arr = $result->fetchAll();

			if ($result) {
				echo json_encode($Arr);
			}

			$conn = null;

		} catch (PDOException $e) {
			echo $result . "<br>" . $e->getMessage();
		}
	} 





 ?>