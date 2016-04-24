<!DOCTYPE html>
<html>
    <head>
        <?php $title = "Data Submission | AirCheck-NG"; require 'res/head.php' ?>
        <script src="res/submission.js"></script>
    </head>
    <body>
        <?php $LANactive = false; $SUBactive = true; $MAPactive = false; require 'res/header.php' ?>
        
        <div class="container">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <br/>
                    <h3 class="pgTitle">User Data Submission</h3>
                    <p align="center">As a part of our global crowd-sourcing of information,
                    to better serve you in the future, we kindly ask that you fill out a short survey to
                    help us grade, analyze and construct our geographic mapping of health symptoms.</p>
                    <p align="center">Your data will be used anonymously to be compared against global weather conditions
                    in order to help other users discover new world health patterns.</p>
                </div>
                <div class="col-md-2"></div>
            </div>
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10"><table class="table" id="submitTable"></table></div>
                <div class="col-md-1"></div>
            </div>
        </div>
    </body>
</html>