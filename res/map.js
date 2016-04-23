Overlay.prototype = new google.maps.OverlayView();

function Overlay() {
}

Overlay.prototype.onAdd = function() {
    overlayCanvas = document.createElement("canvas");
    overlayCanvas.setAttribute("id", "overlay");
    overlayCanvas.style.position = "absolute";
    
    this.getPanes().overlayLayer.appendChild(overlayCanvas);
    
    context = overlayCanvas.getContext("2d");
}

var circles = [];

function genCircles() {
    if(symptoms != undefined) {
        for(var c in circles) {
            //c.map = null;
        }
        circles = [];
        console.log(symptoms);
        for(var k in symptoms) {
            var symp = symptoms[k];
            console.dir(symp);
            var lat = Number(symp.latitude);
            var lng = Number(symp.longitude);
            var rad = Number(symp.radius);
            var circ = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: new google.maps.LatLng(lat, lng),
                radius: Math.max(rad, 10)
            });
        }
   }
}


function redraw() {
    var overlayProjection = overlay.getProjection();
    var bounds = map.getBounds();
    var sw = overlayProjection.fromLatLngToDivPixel(bounds.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(bounds.getNorthEast());
    
    overlayCanvas.style.left = sw.x + 'px';
    overlayCanvas.style.top = ne.y + 'px';
    
    var width = ne.x - sw.x;
    var height = sw.y - ne.y;
    
    overlayCanvas.width = width;
    overlayCanvas.height = height
    
    overlayCanvas.style.width = width + 'px';
    overlayCanvas.style.height = height + 'px';
    
    for(var i = 0; i < 20; ++i) {
        context.moveTo(-sw.x % 100 + i * 100, 0);
        context.lineTo(-sw.x % 100 + i * 100, height);
        context.moveTo(0, -ne.y % 100 + i * 100);
        context.lineTo(width, -ne.y % 100 + i * 100);
    }
    
    if(symptoms != undefined) {
        for(var k in symptoms) {
            var symp = symptoms[k];
            var lat = Number(symp.latitude);
            var lng = Number(symp.longitude);
            var rad = Number(symp.radius);
            
            rad = Math.max(rad, 10);
            
            var p = overlayProjection.fromLatLngToContainerPixel(new google.maps.LatLng({lat: lat, lng: lng}));
            
            context.beginPath();
            context.arc(p.x, p.y, rad, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(255, 128, 0, 0.25)';
            context.fill();
        }
    }
}

Overlay.prototype.draw = function() {
    redraw();
}

Overlay.prototype.onRemove = function() {
}

function boundsChange() {
    redraw();
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: {lat: 43.648, lng: -79.370},
      mapTypeId: google.maps.MapTypeId.MAP
    });
    
    google.maps.event.addListener(map, 'bounds_changed', boundsChange);
    
    overlay = new Overlay();
    overlay.setMap(map);
    genCircles();
    populateMap();
}

google.maps.event.addDomListener(window, 'load', initMap);