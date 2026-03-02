<?php

return [
    // ... other config ...

    'theme' => 'default',

    /*
     * The HTML <title> for the generated documentation
     */
    'title' => 'HireRight API Documentation',

    /*
     * A short description of your API.
     */
    'description' => 'Complete API documentation for HireRight recruitment platform',

    /*
     * The base URL displayed in the docs.
     */
    'base_url' => env('APP_URL', 'http://localhost:8000') . '/api',

    /*
     * Tell Scribe what routes to generate docs for.
     */
    'routes' => [
        [
            'match' => [
                'prefixes' => ['api/*'],
                'domains' => ['*'],
            ],
            'include' => [
                // 'api/*' // Use this to include all API routes
            ],
            'exclude' => [
                'api/test*',
                'api/clear*',
                'api/debug*',
            ],
        ],
    ],

    /*
     * Authentication info
     */
    'auth' => [
        'enabled' => true,
        'default' => false,
        'in' => 'bearer',
        'name' => 'Authorization',
        'use_value' => env('SCRIBE_AUTH_KEY'),
        'placeholder' => 'Enter your Bearer token here',
        'extra_info' => 'You can get your token by logging in via POST /api/auth/login',
    ],

    /*
     * Example requests
     */
    'example_languages' => [
        'bash',
        'javascript',
        'php',
        'python',
    ],

    /*
     * The output path for the generated documentation.
     */
    'static' => [
        'output_path' => 'public/docs',
    ],

    'laravel' => [
        'add_routes' => true,
        'docs_url' => '/docs',
    ],

    // ... rest of config ...
];