<?php
require 'class-api-request.php';
require 'class-record-parser.php';
class Harvest {
    private $requestNr = 0;
    private $api;

    function __construct($apikey) {
        $this->api = new ApiRequest($apikey);
    }

    public function harvest($resumptiontoken = false) {
        $this->requestNr++;

        if ($resumptiontoken) {
            $args = array(
                "resumptiontoken" => $resumptiontoken
            );
        } else {
            $args = array();
        }

        $xml = $this->api->listRecords($args);
        if (!$xml) {
            die('Did not get back records');
        }

        $p = new RecordParser($xml);
        file_put_contents($this->requestNr . ".json", $p->asJson());

        $rt = $p->getResumptionToken();
        if ($rt) {
            $this->harvest($rt);
        } else {
            die("No resumptiontoken!");
        }
    }
}