<?php
$hostname = '127.0.0.1';
$username = 'root';
$password = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $itemID = $_POST['id'];
    $itemPrice = $_POST['cost'];

    $conn = new mysqli($hostname, $username, $password, 'waiter');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $query = "INSERT INTO statistics_history(id, gained, dateAchieved) VALUES('$itemID', '$itemPrice', now())";
    if (mysqli_query($conn, $query)) {
        echo "Order Item Stored Successfully!";
    } else { echo "err: " . mysqli_error($conn); }

    $conn->close();
}
