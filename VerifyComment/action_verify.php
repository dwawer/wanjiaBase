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

      $result = $conn->query("select * from commentlist where verify = 0");

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

    $id = $_POST["id"];
    $type = $_POST["type"];

    $servername = "localhost";
    $username = "root";
    $password = "0769@unicom";

    try {

      $conn = new PDO("mysql:host=$servername;dbname=user", $username, $password);

      //$result = $conn->query("update activitylist set likenum = likenum + 1 
                    //where id = $id");

      $conn->query("set names utf8;");
      
      if ($type == "pass") {
        //todo
        $result = $conn->query("update commentlist set verify = 1 where id = $id");

        if ($result) {
          echo "pass success";
        } else {
          echo "pass fail";
        }

      } else if ($type == "delete") {
        //todo
        $result = $conn->query("delete from commentlist where id = $id");

        if ($result) {
          echo "delete success";
        } else {
          echo "delete fail";
        }
      }

      $conn = null;

    } catch (PDOException $e) {
      echo $result . "<br>" . $e->getMessage();
    }
  }


 ?>