<?php 
    include('database.php');

    if(isset($_POST['name'])) {
        $name = $_POST['name'];
        $description = $_POST['description'];
        $query = "INSERT INTO comment(name, comment) VALUES('$name', '$description')";
        $result = mysqli_query($db, $query);
        if(!$result) {
            die('Query Failed.');
        }
        echo 'Comment Added Successfully';
    }
?>