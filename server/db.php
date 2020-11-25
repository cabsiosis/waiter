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

    $query = 'SELECT f_name, f_type, f_price, f_currency, f_stock, f_image
    FROM foodnames
    INNER JOIN foodtype
    ON foodnames.id = foodtype.id
    INNER JOIN foodprice 
    ON foodtype.id = foodprice.id
    INNER JOIN foodstock
    ON foodprice.id = foodstock.id
    INNER JOIN foodimages
    ON foodstock.id = foodimages.id';    
    // idk how to join to food type

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
