<?php
// get orders
$hostname = '127.0.0.1';
$username = 'root';
$password = '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $conn = new mysqli($hostname, $username, $password, 'waiter');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $query = "SELECT id, cost, orderState, items FROM orderlist";
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
    $orderID = $_POST['orderID'];
    $due = $_POST['due'];
    $orderState = $_POST['orderState'];
    $items = $_POST['items'];

    $conn = new mysqli($hostname, $username, $password, 'waiter');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $query = "INSERT INTO orderlist(id, cost, orderState, items) VALUES('$orderID', '$due', '$orderState', '$items')";
    if (mysqli_query($conn, $query)) {
        echo "Order Item Stored Successfully!";
    } else { echo "err: " . mysqli_error($conn); }

    $conn->close();
}
