<?php
require 'class-http-request.php';

class ApiRequest {
    private $apikey;

    const ENDPOINT = "http://www.rijksmuseum.nl/api/oai";

    function __construct($apikey) {
        $this->apikey = $apikey;
    }

    public function listRecords($initArgs) {
        $args = array(
            "verb" => "ListRecords",
            "set" => "collectie_online",
            "metadataPrefix" => "oaidc" //New, is needed, always oaidc? Not really clear from the docs...
        );

        if (isset($initArgs['resumptiontoken'])) {
            $args['resumptiontoken'] = $initArgs['resumptiontoken'];
        }

        return $this->doCall($args);
    }

    public function getRecord($initArgs) {
        if (!isset($initArgs['identifer'])) {
            throw new Exception("Identifier expected");
        }

        return $this->doCall(array(
            "verb" => "GetRecord",
            "identifer" => $initArgs['identifer']
        ));
    }

    private function doCall($args) {
        $url = $this->buildUrl($args);
        $r = new HttpRequest("get", $url);
        if ($r->getError()) {
            die("Error! " . $r->getError());
        } else {
            echo "Got url! $url";
            return $r->getResponse();
        }
    }

    private function buildUrl($args) {
        $url=self::ENDPOINT ."/".$this->apikey."/?a=a"; //we need to set the api key. The ?a=a is bogus, but makes the foreach below work without detecting if we should start with a ? or a &

        foreach ($args as $key=>$value) {
            $url .= "&$key=$value";
        }

        return $url;
    }
}