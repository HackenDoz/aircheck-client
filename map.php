<!DOCTYPE html>
<html class="fullheight">
    <head>
        <?php $title = "Map | AirCheck-NG"; require("res/head.php"); ?>
        <script src="res/main.js"></script>
    </head>
    <body class="fullheight">
      <div id="4431" style="
    border-radius: 4px;
    padding: 12px;
    position: fixed;
    right: 50px;
    bottom: 164px;
    z-index: 100;
    background-color: white;
    /* overflow-y: auto; */
    overflow-x: auto;
    width: 200px;
    height: 108px;
    box-shadow: 1px 1px 1px #CCC;
"></div>
      <div class="nomobiles" style="
    border-radius: 4px;
    padding: 12px;
    position: fixed;
    right: 50px;
    bottom: 24px;
    z-index: 100;
    background-color: white;
    width: 200px;
    box-shadow: 1px 1px 1px #CCC;

    ">
        <div style="text-align: center; text-transform: capitalize;">Legend</div>
        <div class="fuckrow">
          <div class="green-circle"></div><p>Symptom</p>
        </div>
        <div class="fuckrow">
          <div class="red-circle"></div><p>Extreme Weather</p>
        </div>
      </div>
        <?php $LANactive = false; $SUBactive=false; $MAPactive = true; require("res/header.php") ?>
        <div class="container-fluid fullheight">
            <div class="row fullheight">
                <div class="col-sm-3 navbar-default">
                    <ul class="nav nav-sidebar" id="mapsymptoms">
                    </ul>
                </div>
                <div id="map" class="col-sm-9 fullheight hidden-xs">
                </div>
            </div>
        </div>
        <div id="3251"></div>
        <script src="https://maps.googleapis.com/maps/api/js"></script>
        <script src="res/map.js"></script>
        <!--<script>
            var overlay;
      USGSOverlay.prototype = new google.maps.OverlayView();

      // Initialize the map and the custom overlay.

      function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 16,
          center: {lat: 43.648, lng: -79.370},
          mapTypeId: google.maps.MapTypeId.MAP
        });

        var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(43.648, -79.370),
            new google.maps.LatLng(43.7, -79.3));

        overlay = new USGSOverlay(bounds, "test.png", map);
      }
      
      function changeOverlay() {
        //overlay.image_ = Math.round(Math.random()) == 1 ? "test.png" : "screenshot.png";
        overlay.setMap(map);
      }
      
      function bounds() {
        var b1 = map.getBounds();
        console.log(b1.R.j);
      }
      
      setInterval(bounds, 1000);
      
      //setInterval(changeOverlay, 1)

      function USGSOverlay(bounds, image, map) {
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;

        this.div_ = null;

        this.setMap(map);
      }
      
      google.maps.event.addListener(map, 'bounds_changed', function() {
    console.log(map.getBounds());
});

      USGSOverlay.prototype.onAdd = function() {

        var div = document.createElement('canvas');
        div.setAttribute("id", "canvas");
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';

        // Create the img element and attach it to the div.
        /*var img = document.createElement('img');
        img.src = this.image_;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.position = 'absolute';
        div.appendChild(img);*/

        this.div_ = div;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
      };

      USGSOverlay.prototype.draw = function() {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();
 
        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
      };

      USGSOverlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
      };

      google.maps.event.addDomListener(window, 'load', initMap);
        </script>-->

<!--<script src="res/gravsim.js"></script>
<script>setTimeout(gravSim, 1000);</script>-->
    </body>
</html>