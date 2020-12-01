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

    $query = "SELECT id, due, orderState FROM orderlist";
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

    $conn = new mysqli($hostname, $username, $password, 'waiter');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $query = "INSERT INTO orderlist(id, due, orderState) VALUES('$orderID', '$due', '$orderState')";
    if (mysqli_query($conn, $query)) {
        echo "Order Insert Successfully";
    } else { echo "err: " . mysqli_error($conn); }

    $conn->close();
}