<?php
$hostname = '127.0.0.1';
$username = 'root';
$password = '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $conn = new mysqli($hostname, $username, $password, 'waiter-production');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $query = "SELECT MAX(id) as maxID FROM orderlist";
    $res = mysqli_query($conn, $query);
    $queryArr = array();

    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $queryArr[] = $row;
        }
    }

    $conn->close();
    echo json_encode($queryArr);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $delObj = $_POST['id'];

    $conn = new mysqli($hostname, $username, $password, 'waiter-production');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $delete_query = "DELETE FROM orderlist WHERE id = $delObj";
    $get_query = "SELECT items FROM orderlist WHERE id = $delObj";
    
    $get_res = mysqli_query($conn, $get_query);
    $get_row = mysqli_fetch_assoc($get_res);

    $tempVar = implode("", $get_row);
    $itemArr = explode(",", rtrim($tempVar, ","));

    $update_string = "";
    foreach ($itemArr as $item) {
        $currentItem = explode(":", $item);
        // $update_string .= $currentItem[0] . " = " . $currentItem[0] . " - " . $currentItem[1] . ", ";
        // $tempVar_2 = "UPDATE foodstock SET " . $update_string;
        $update_query = "UPDATE foodstock INNER JOIN foodname ON foodstock.id = foodname.id SET f_stock = f_stock - '$currentItem[1]' WHERE f_name = '$currentItem[0]'";
        mysqli_query($conn, $update_query);
    }

    mysqli_query($conn, $delete_query);
    $conn->close();
}