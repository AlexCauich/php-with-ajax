<?php  

    include('database.php');

    if(isset($_POST['id'])) {
        $id = $_POST['id'];

        $query = "DELETE FROM comment WHERE id = $id";
        $result = mysqli_query($db, $query);
        if(!$result) {
            die('jQuery Filed.');
        }
    }

?>