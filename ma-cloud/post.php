<?php
if (isset($_GET['LED1'])) {
    $data->lights->LED1 = filter_var($_GET['LED1'], FILTER_VALIDATE_BOOLEAN);
}
error_log("Ontvangen LED1-waarde: " . $_GET['LED1']);
error_log("Bijgewerkte JSON: " . json_encode($data));
error_log("Ontvangen verzoek: " . print_r($_GET, true));
error_log("Ontvangen POST-data: " . file_get_contents('php://input'));
header('Access-Control-Allow-Origin: *');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

$jsonFile = 'jsonInput.json';

// Create a default JSON file if it doesn't exist
if (!file_exists($jsonFile)) {
    $defaultData = [
        "lights" => [
            "LED1" => false,
            "LED2" => false,
            "LED3" => false
        ],
        "ldr"    => null,
        "dht11"  => [
            "temperature" => null,
            "humidity"    => null,
            "heatIndex"   => null
        ]
    ];
    file_put_contents($jsonFile, json_encode($defaultData));
}

// Helper function to read and decode the JSON file
function readJsonFile($file) {
    $contents = file_get_contents($file);
    if ($contents === false) {
        die("Error: Unable to read the JSON file.");
    }
    $data = json_decode($contents);
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        die("Error: JSON decode error in file.");
    }
    return $data;
}

// Helper function to encode and write data to the JSON file
function writeJsonFile($file, $data) {
    $json = json_encode($data, JSON_PRETTY_PRINT);
    if ($json === false) {
        die("Error: JSON encode error.");
    }
    // Validate the JSON string
    if (json_decode($json) === null && json_last_error() !== JSON_ERROR_NONE) {
        die("Error: Invalid JSON produced: " . json_last_error_msg());
    }
    if (file_put_contents($file, $json, LOCK_EX) === false) {
        die("Error: Unable to write to the JSON file.");
    }
}


// Check if the request is coming from an Arduino (via GET parameter 'arduino')
if (!isset($_GET['arduino'])) {
    // Browser request (update LED states)
    $data = readJsonFile($jsonFile);
    
    // Update LED states using object property access
    if (isset($_GET['LED1'])) {
        $data->lights->LED1 = filter_var($_GET['LED1'], FILTER_VALIDATE_BOOLEAN);
    }
    if (isset($_GET['LED2'])) {
        $data->lights->LED2 = filter_var($_GET['LED2'], FILTER_VALIDATE_BOOLEAN);
    }
    if (isset($_GET['LED3'])) {
        $data->lights->LED3 = filter_var($_GET['LED3'], FILTER_VALIDATE_BOOLEAN);
    }
    
    writeJsonFile($jsonFile, $data);
    
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data);
    exit;
}

// Arduino request branch
header('Content-Type: application/json; charset=UTF-8');

$jsonInput = file_get_contents('php://input');

if (empty($jsonInput)) {
    echo file_get_contents($jsonFile);
    exit;
}

$inputData = json_decode($jsonInput);
if ($inputData === null && json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON input"]);
    exit;
}

$data = readJsonFile($jsonFile);

if (isset($inputData->ldr)) {
    $data->ldr = $inputData->ldr;
}

if (isset($inputData->dht11)) {
    if (isset($inputData->dht11->temperature)) {
        $data->dht11->temperature = $inputData->dht11->temperature;
    }
    if (isset($inputData->dht11->humidity)) {
        $data->dht11->humidity = $inputData->dht11->humidity;
    }
    if (isset($inputData->dht11->heatIndex)) {
        $data->dht11->heatIndex = $inputData->dht11->heatIndex;
    }
}

writeJsonFile($jsonFile, $data);
echo json_encode($data);

error_log("LED1 status: " . ($data->lights->LED1 ? "true" : "false"));
error_log("LED2 status: " . ($data->lights->LED2 ? "true" : "false"));
error_log("LED3 status: " . ($data->lights->LED3 ? "true" : "false"));


?>