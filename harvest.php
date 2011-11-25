<?php
require 'config.php';
require 'class-harvest.php';

$harvest = new Harvest(Config::API_KEY);
$harvest->harvest();