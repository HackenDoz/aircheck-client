function removeMap(){
    document.getElementById("map").className = "col-sm-9 fullheight hidden-xs heightzero-xs";
    document.getElementById("mapsymptoms").className = "nav nav-sidebar";
}

function openMap(){
    if(window.innerWidth <= 767){
        document.getElementById("map").className = "";
        document.getElementById("mapsymptoms").className = "nav nav-sidebar hidden-xs";
        
        history.pushState({}, "", document.location);
        
        map.refresh();
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    }
}

$(document).ready(function(){
    populateSymptoms();
    populateMap();
    window.onpopstate = removeMap;
    
    removeMap();
});

function click(e) {
    var elements = document.getElementById("mapsymptoms").childNodes;

    for (var i = 0; i < elements.length; i++) {
        if(i == e){
            continue;
        }
        elements[i].className = "";
    }
    
    if(elements[e].className.indexOf("active") > -1){
        elements[e].className = "";
        elements[e].blur();
    }else{
        elements[e].className = "active";
    }
}

function populateSymptoms() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var w = document.getElementById("mapsymptoms");
            var i = 0;
            w.innerHTML = '<li><h4 class="visible-xs">Click one to display a map</h4></li>';
            var data = JSON.parse(xhttp.responseText)["symptoms"];
            console.dir(data);
            data.forEach(function(element){
                (function(i){
                    var symptom = element.name;
                    console.log(symptom);
                    
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.setAttribute("href", "javascript:void(0)");
                    a.appendChild(document.createTextNode(symptom));
                    li.appendChild(a);
                    li.onclick = function(){
                        click(i);
                    }
                    w.appendChild(li);
                })(++i);
            });
            var li = document.createElement("li");
            var a = document.createElement("button");
            a.className = "btn btn-primary btn-fullwidth visible-xs";
            a.appendChild(document.createTextNode("Show map"));
            li.appendChild(a);
            li.onclick = openMap;
            w.appendChild(li);
        }
    }
    xhttp.open("GET", "//api.aircheck-ng.tk/symptoms", true);
    xhttp.send();
}

function populateMap() {
    var xhttp = new XMLHttpRequest();
    //xhttp.onreadystatechange = function() {
    //    if (xhttp.readyState == 4 && xhttp.status == 200) {
    //        var data = JSON.parse(xhttp.responseText)["heatmap"];
    //        showMap(data);
    //    }
    //};
    //xhttp.open("GET", "//api.aircheck-ng.tk/mapping", true);
    xhttp.open("GET", "//api.aircheck-ng.tk/mapping", false);
    xhttp.send();
    showMap(JSON.parse(xhttp.responseText)["heatmap"]);
}

function showMap(symp) {
    symptoms = symp;
}


function getWeather(lat, long) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Temperature, Pressure, Humidity, Wind Speed
            var data = JSON.parse(xhttp.responseText);
            console.dir(data);
            var output = {};
            output["temperature"] = data["main"]["temp"];
            output["humidity"] = data["main"]["humidity"];
            output["wind"] = data["wind"]["speed"];
            console.dir(output);
        }
    };
    xhttp.open("GET", "//api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=58e80df1ecf484fd3c75c6ee1ee12eab", true);
    xhttp.send();
}