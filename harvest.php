<?php
require 'class-api-request.php';
require 'class-record-parser.php';
require 'config.php';

$api = new ApiRequest(Config::API_KEY);
$requestNr = 0;

function request($resumptiontoken = false) {
    global $api;

    $requestNr++;

    if ($resumptiontoken) {
        $args = array(
            "resumptiontoken" => $resumptiontoken
        );
    } else {
        $args = array();
    }

    $xml = $api->listRecords($args);
    if (!$records) {
        die('Did not get back records');
    }

    $p = new RecordParser($xml);
    file_put_contents("$requestNr.json", $p->asJson());

    $rt = $p->getResumptionToken();
    if ($rt) {
        request($rt);
    } else {
        die("No resumptiontoken!");
    }
}

request();