<?php
$hostname = '127.0.0.1';
$username = 'root';
$password = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $delObj = $_POST['id'];

    $conn = new mysqli($hostname, $username, $password, 'waiter-production');
    if ($conn->connect_error) {
        die('conn failed:' . $conn->connect_error);
    }

    $delete_query = "DELETE FROM orderlist WHERE id = $delObj";

    mysqli_query($conn, $delete_query);
    $conn->close();
}