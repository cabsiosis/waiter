<?php
// connect to db

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $hostname = '127.0.0.1';
    $username = 'root';
    $password = '';

    $conn = new mysqli($hostname, $username, $password, 'waiter');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $query = 'SELECT * FROM fooditems';
    $res = mysqli_query($conn, $query);
    $queryArr = array();

    if (mysqli_num_rows($res) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $queryArr[] = $row;
        }
    }

    echo json_encode($queryArr);
}
