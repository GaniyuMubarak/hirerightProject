<?php
// This will force Laravel to refresh its settings
shell_exec('php ../artisan config:clear');
shell_exec('php ../artisan route:clear');
echo "Laravel Cache Cleared!";
