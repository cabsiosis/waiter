<?php
$hostname = '127.0.0.1';
$username = 'root';
$password = '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $conn = new mysqli($hostname, $username, $password, 'waiter-production');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $query = "SELECT f_name, f_stock 
    FROM foodname
    INNER JOIN foodstock
    ON foodname.id = foodstock.id";

    $res = mysqli_query($conn, $query);
    $queryArr = array();

    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $queryArr[] = $row;
        }
    }

    echo json_encode($queryArr);
    $conn->close();
}