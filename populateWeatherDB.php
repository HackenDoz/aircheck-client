<?php
$servername = "localhost";
$username = "root";
$password = "~";
$dbname = "~";

//$conn = mysqli_connect($servername, $username, $password, $dbname);
$contents = json_decode(file_get_contents("data/json.txt"), true);

foreach ($contents as $value) {
    $lat = $value["lat"];
    $lon = $value["lon"];
    foreach ($value as $key => $val) {
        $weatherID = 0;
        if ($key == "humidity") {
            $weatherID = 1;
        } else if ($key == "temp") {
            $weatherID = 2;
        } else if ($key == "windSpeed") {
            $weatherID = 3;
        }
        if ($weatherID != 0) {
            $sql = "INSERT INTO weather_reports (latitude, longitude, value, weather_id) VALUES ('$lat', '$lon', '$val', '$weatherID')";
        }
    }
}

/*
$sql = "INSERT INTO MyGuests (firstname, lastname, email)
 VALUES ('John', 'Doe', 'john@example.com')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);*/
 ?> 