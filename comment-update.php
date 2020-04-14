<?php
    include('database.php');
    
    $id = $_POST['id'];
    $query = "SELECT * FROM comment WHERE id = $id";
    $result = mysqli_query($db, $query);
    
    if(!$result) {
        die('jQuery Failed.');
    }

    $json = array();
    while($row = mysqli_fetch_array($result)) {
        $json[] = array (
            'name' => $row['name'],
            'description' => $row['comment'],
            'id' => $row['id']
        );
    }

    $jsonstring = json_encode($json[0]);
    echo $jsonstring;    

?>