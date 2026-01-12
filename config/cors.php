<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

<<<<<<< HEAD
    'allowed_origins' => [
            'http://localhost:8000',
            'http://127.0.0.1:8000',
            'https://hirerightapp.com'
    ],  // Allow all for testing
=======
    'allowed_origins' => ['*'],  // Allow all for testing
>>>>>>> 5853b763aeab113a5e8d4cb7bd2f7b6f1ab84315

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,  // Change to false for API token auth
<<<<<<< HEAD
];
=======
];
>>>>>>> 5853b763aeab113a5e8d4cb7bd2f7b6f1ab84315
