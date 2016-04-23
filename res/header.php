<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle map" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div>
                <div>
                    <a class="navbar-brand" href="index.php">
                        <img id="nav-img" alt="Brand" src="res/logo.svg" height="40px" width="40px">
                    </a>
                </div>
            </div>
                    
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav hidden-xs">
                <li><a href="index.php">Aircheck-NG</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="<?php if ($MAPactive) {echo "active";} ?>"><a href="index.php">Map</a></li>
                <li class="<?php if ($SUBactive) {echo "active";} ?>"><a href="submission.php">Submissions</a></li>
            </ul>
        </div>
    </div>
</nav>