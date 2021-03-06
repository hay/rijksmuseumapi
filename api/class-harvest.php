<?php
require 'class-api-request.php';
require 'class-record-parser.php';
require 'class-event-based-class.php';
class Harvest extends EventBasedClass {
    private $requestNr = 0;
    private $api;

    function __construct($apikey) {
        $this->api = new ApiRequest($apikey);
    }

    public function harvest($resumptiontoken = false) {
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

        $this->emit("recordsloaded");

        $p = new RecordParser($xml);
        $this->requestNr++;
        file_put_contents("./output/" . $this->requestNr . ".json", $p->asJson());

        $this->emit("datawritten", $this->requestNr);

        $rt = $p->getResumptionToken();
        if ($rt) {
            $this->harvest($rt);
        } else {
            die("No resumptiontoken!");
        }
    }
}