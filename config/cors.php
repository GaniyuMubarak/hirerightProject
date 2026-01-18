<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],
    'allowed_origins' => [
            'http://localhost:8000',
            'http://127.0.0.1:8000',
            'https://hirerightapp.com'
    ],  // Allow all for testing

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,  // Change to false for API token auth

];


