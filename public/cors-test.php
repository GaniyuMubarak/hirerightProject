<?php
header("Access-Control-Allow-Origin: https://hirerightapp.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
echo json_encode(["message" => "CORS is working on this script!"]);
