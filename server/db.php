<?php
// connect to db

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $hostname = '127.0.0.1';
    $username = 'root';
    $password = '';

    $conn = new mysqli($hostname, $username, $password, 'waiter-production');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    } 

    $query = 'SELECT f_name, f_type, f_price, f_currency, f_stock, f_image
    FROM foodname
    INNER JOIN foodtype
    ON foodname.id = foodtype.id
    INNER JOIN foodprice 
    ON foodtype.id = foodprice.id
    INNER JOIN foodstock
    ON foodprice.id = foodstock.id
    INNER JOIN foodimage
    ON foodstock.id = foodimage.id';

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
