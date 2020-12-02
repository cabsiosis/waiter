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

    $conn = new mysqli($hostname, $username, $password, 'waiter');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $query = "DELETE FROM orderlist WHERE id = $delObj";
    if (mysqli_query($conn, $query)) {
        echo "Order Item Deleted!";
    } else { echo "err: " . mysqli_error($conn); }
    $conn->close();
}