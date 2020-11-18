<?php
// get orders

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hostname = '127.0.0.1';
    $username = 'root';
    $password = '';

    $orderID = $_POST['orderID'];
    $due = $_POST['due'];
    $orderState = $_POST['orderState'];

    $conn = new mysqli($hostname, $username, $password, 'waiter');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $query = 'INSERT INTO orderlist(orderID, due, orderState) VALUES($orderID, $due, $orderState)';
    $req = mysqli_query($conn, $query);

    $conn->close();
    echo $orderID . $due . $orderState;
}