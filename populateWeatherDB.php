<?php
$servername = "localhost";
$username = "root";
$password = "~";
$dbname = "~";

//$conn = mysqli_connect($servername, $username, $password, $dbname);
$contents = json_decode('[{"lat":35.149529,"lon":-90.048981,"humidity":49,"pressure":1017,"temp":22.16,"windSpeed":2.6,"windDeg":150},{"lat":36.16589,"lon":-86.784439,"humidity":52,"pressure":1019,"temp":21.4,"windSpeed":3.1,"windDeg":160},{"lat":41.850029,"lon":-87.650047,"humidity":55,"pressure":1016,"temp":16.72,"windSpeed":6.2,"windDeg":170},{"lat":39.768379,"lon":-86.158043,"humidity":59,"pressure":1018,"temp":16.76,"windSpeed":3.1,"windDeg":170},{"lat":35.227089,"lon":-80.843132,"humidity":48,"pressure":1021,"temp":18.89,"windSpeed":2.1,"windDeg":60},{"lat":43.700111,"lon":-79.416298,"humidity":45,"pressure":1022,"temp":7.75,"windSpeed":4.1,"windDeg":80},{"lat":36.852928,"lon":-75.977982,"humidity":36,"pressure":1020,"temp":16,"windSpeed":5.1,"windDeg":50},{"lat":40.714272,"lon":-74.005966,"humidity":20,"pressure":1019,"temp":13.14,"windSpeed":4.6,"windDeg":330},{"lat":43.000351,"lon":-75.499901,"humidity":29,"pressure":1021,"temp":10.35,"windSpeed":3.1,"windDeg":280},{"lat":48.400101,"lon":-89.316833,"humidity":59,"pressure":1020,"temp":5.07,"windSpeed":7.2,"windDeg":80},{"lat":46.516769,"lon":-84.333252,"humidity":100,"pressure":1020,"temp":2.68,"windSpeed":3.6,"windDeg":60},{"lat":46.490002,"lon":-80.990013,"humidity":52,"pressure":1020,"temp":6.69,"windSpeed":4.1,"windDeg":280},{"lat":45.508839,"lon":-73.587807,"humidity":25,"pressure":1022,"temp":4.95,"windSpeed":2.1,"windDeg":250},{"lat":48.416752,"lon":-71.065727,"humidity":50,"pressure":1019,"temp":1,"windSpeed":3.6,"windDeg":280}]', true);
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
            //mysqli_query($conn, $sql);
        }
    }
}
//mysqli_close($conn);
*/
 ?> 