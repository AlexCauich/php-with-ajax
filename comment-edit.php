<?php

    include('database.php');

    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];

    $query = "UPDATE comment SET name = '$name', comment = '$description' WHERE id = '$id'";
    $result = mysqli_query($db, $query);
    if(!$result) {
        die('jQuery Failed');
    }
?>