<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoNest</title>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
    
    <script src="js/main.js" defer></script>
    <script src="js/weather.js" defer></script>
    <script src="js/graphandsunriseset.js" defer></script>

    <!-- All CSS for Main -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/main.css">

    <!-- All CSS for A -->
    <link rel="stylesheet" href="css/A/weather.css">
    <link rel="stylesheet" href="css/A/ActueleTemp.css">
    <link rel="stylesheet" href="css/A/zontijden.css">
    <link rel="stylesheet" href="css/A/buitenEnBinnentemp.css">
    
    <!-- All CSS for B -->
    <link rel="stylesheet" href="css/B/weatherGrath.css">
</head>

<body>
    <div class="Header" id="BoxShadow">
        <div class="Top">
            <div class="Logo">
                <h3 class="LogoTime" id="TextShadow">0:00</h3>
                <div class="LogoFrame" id="BoxShadow">
                    <img src="images/logo.png" alt="Logo">
                </div>
                <h3 class="LogoText" id="TextShadow">EcoNest</h3>
            </div>
            <div class="Buttons">
                <a class="Button" href="?page=A"><h3>Weer</h3></a>
                <a class="Button" href="?page=B"><h3>Engerie</h3></a>
                <a class="Button" href="?page=C"><h3>Huisje</h3></a>
                <a class="Button" href="?page=Settings"><h3>Settings</h3></a>
            </div>
        </div>
        <div class="Account">
            <div class="AccountFrame">
                <img src="images/Account.svg" alt="AccountIcon" srcset="">
                <h3 class="AccountText" id="TextShadow">Nick</h3>
            </div>
        </div>
    </div>
    <!-- The Main page -->
    <?php
        $page = 'A';
        if (isset($_GET['page'])) {
            $allowed_pages = ['A', 'B', 'C', 'Settings'];
            if (in_array($_GET['page'], $allowed_pages)) {
                $page = $_GET['page'];
            }
        }
        include "./{$page}.html";
    ?>
</body>

</html> 