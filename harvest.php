<?php
require 'config.php';
require 'class-harvest.php';

$harvest = new Harvest(Config::API_KEY);

$harvest->on("datawritten", function($i) {
    echo "$i.json written\n";
});

$harvest->on("recordsloaded", function() {
    echo "Loaded records\n";
});

$harvest->harvest();