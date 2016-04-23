$(document).ready(function(){
    populateTable();
    $('[data-toggle="tooltip"]').tooltip();
});

function populateTable() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            var tableData = "<tr><td colspan=\"2\"><h5>Symptom</h5></td><td><div class='nomobile' style='float:left; width: 33%'><h6>Lower</h6></div><div style='float:left; width: 33%'><center><h5>Severity</h5></center></div><div class='nomobile' style='float:left; width: 33%; text-align: right;'><h6>Higher</h6></td></tr>";
            for (var i = 1; i < data["symptoms"].length + 1; i++) {
                var cur = data["symptoms"][i - 1];
                var id = i;
                var symptom = cur["name"];
                var desc = cur["desc"];
                tableData += '<tr class="tableRow3251">';
                tableData += '<td class="col-md-3">' + symptom + '</td>';
                tableData += '<td class="col-md-1 cent"><a href="#" data-toggle="tooltip" data-placement="top" title="' + desc + '"><i class="fa fa-info-circle fa-2x" aria-hidden="true"></i></a></td>';
                tableData += '<td class="col-md-8"><input type="range" name="' + id + '" id="' + id + '" value="0" min="0" max="5"></td>';
                tableData += '</tr>';
            }
            tableData += '<tr><td colspan="3"><button class="btn" style="width: 100%" onclick="submitToServer()">SUBMIT</button></td></tr>';
            document.getElementById("submitTable").innerHTML = tableData;
            $('[data-toggle="tooltip"]').tooltip();
        }
    };
    xhttp.open("GET", "//api.aircheck-ng.tk/symptoms", true);
    xhttp.send();
}

function submitToServer() {
    navigator.geolocation.getCurrentPosition(function(pos) {
        var crd = pos.coords;
        var elems = document.getElementsByClassName("tableRow3251");
        var symps = {};
        for (var i = 1; i < elems.length + 1; i++) {
            symps[i + ""] = parseInt(document.getElementById(i).value);
        }
        var toSend = {
            "latitude": crd.latitude,
            "longitude": crd.longitude,
            "symptoms": symps
        };
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                alert("Success");
                window.location.reload();
            }
        }
        xhttp.open("POST", "//api.aircheck-ng.tk/submit", true);
        xhttp.send(JSON.stringify(toSend));
    });
}