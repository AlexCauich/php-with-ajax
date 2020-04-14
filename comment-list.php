<?php
    include('database.php');

    $query = "SELECT * FROM comment";
    $result = mysqli_query($db, $query);

    if(!$result) {
        die('Query Failed'. mysqli_error($db));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'name' => $row['name'],
            'comment' => $row['comment'],
            'id' => $row['id']
        );
    }  

    $jsonstring = json_encode($json);
    echo $jsonstring;
?>