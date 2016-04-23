$(document).ready(function(){
    populateTable();
    $('[data-toggle="tooltip"]').tooltip();
});

function populateTable() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = xhttp.responseText;
            //var data = {"status":true,"symptoms":[{"id":"1","name":"Cough","desc":"A cough is a sudden and often repetitively occurring reflex which helps to clear the large breathing passages from secretions, irritants, foreign particles and microbes."},{"id":"2","name":"Wheezing","desc":"A wheeze (formally called 'sibilant rhonchi' in medical terminology) is a continuous, coarse, whistling sound produced in the respiratory airways during breathing."},{"id":"3","name":"Nasal Obstruction","desc":"Nasal congestion is the blockage of the nasal passages usually due to membranes lining the nose becoming swollen from inflamed blood vessels. It is also known as nasal blockage, nasal obstruction, blocked nose, stuffy nose, or plugged nose."},{"id":"4","name":"Itchy Eye","desc":"Euphemism for the anus. Specifically referencing it's proclivity to itch when unclean or uncared for.\n"},{"id":"5","name":"Lung Cancer","desc":"Lung cancer, also known as lung carcinoma, is a malignant lung tumor characterized by uncontrolled cell growth in tissues of the lung."}]};
            var tableData = "";
            for (var i = 1; i < data["symptoms"].length + 1; i++) {
                var cur = data["symptoms"][i - 1];
                var id = i;
                var symptom = cur["name"];
                var desc = cur["desc"];
                tableData += '<tr>';
                tableData += '<td class="col-md-3">' + symptom + '</td>';
                tableData += '<td class="col-md-1 cent"><a href="#" data-toggle="tooltip" data-placement="top" title="' + desc + '"><i class="fa fa-info-circle fa-2x" aria-hidden="true"></i></a></td>';
                tableData += '<td class="col-md-8"><input type="range" name="' + id + '" id="' + id + '" value="0" min="0" max="5"></td>';
                tableData += '</tr>';
            }
            document.getElementById("submitTable").innerHTML = tableData;
        }
    };
    xhttp.open("POST", "//aircheck-hacken.tk:8080/symptoms/", true);
    xhttp.send();
}