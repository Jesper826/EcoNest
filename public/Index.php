<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoNest</title>

    <script src="js/main.js" defer></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>

    <link rel="stylesheet" href="css/reset.css">

    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/weather.css">
    <link rel="stylesheet" href="css/weatherGrath.css">
    <link rel="stylesheet" href="css/ActueleTemp.css">
    <link rel="stylesheet" href="css/zontijden.css">
    <link rel="stylesheet" href="css/buitenEnBinnentemp.css">
</head>

<body>
    <div class="Header" id="BoxShadow">
        <div class="Top">
            <div class="Logo">
                <h3 class="LogoTime" id="TextShadow">0:00 AM</h3>
                <div class="LogoFrame" id="BoxShadow">
                    <img src="images/logo.png" alt="Logo">
                </div>
                <h3 class="LogoText" id="TextShadow">EcoNest</h3>
            </div>
            <div class="Buttons">
                <a class="Button" id="activeButton">
                    <h3 class="ButtonText">Weer</h3>
                </a>
                <a href="B.html" class="Button">
                    <div class="ButtonBackground"></div>
                    <h3 class="ButtonText">Engerie</h3>
                </a>
                <a href="C.html" class="Button">
                    <div class="ButtonBackground"></div>
                    <h3 class="ButtonText">Huisje</h3>
                </a>
                <a href="Settings.html" class="Button">
                    <div class="ButtonBackground"></div>
                    <h3 class="ButtonText">Settings</h3>
                </a>
            </div>
        </div>
        <div class="Account">
            <div class="AccountFrame">
                <img src="images/Account.svg" alt="AccountIcon" srcset="">
                <h3 class="AccountText" id="TextShadow">Nick</h3>
            </div>
        </div>
    </div>
    <div class="Main">
        <?php include "./A.html" ?>
    </div>
</body>

</html>