<?php
class RecordParser {
    const NS_OAI_DC = "http://www.openarchives.org/OAI/2.0/oai_dc/";
    const NS_DC = "http://purl.org/dc/elements/1.1/";

    private $xml;
    private $records = array();

    function __construct($xml) {
        $this->xml = simplexml_load_string($xml);
        $this->parse();
    }

    public function getRecords() {
        return $this->records;
    }

    public function asJson() {
        return json_encode( $this->getRecords() );
    }

    public function getResumptionToken() {
        if ($this->xml->ListRecords->resumptionToken) {
            return (string) $this->xml->ListRecords->resumptionToken;
        } else {
            return false;
        }
    }

    private function parse() {
      foreach ($this->xml->ListRecords->record as $record) {
            $this->records[] = $this->parseRecord($record);
        }
    }

    private function parseRecord($record) {
        $data = array(
            "formats" => array()
        );

        $metadata = $record->metadata->children(self::NS_OAI_DC)->children(self::NS_DC);

        foreach ($metadata as $key => $value) {
            if ((string) $key == "format") {
                // Oh, the wonderful world of XML and OAI-PMH,
                // let's put all the formats in a seperate key
                if ($value->identifier) {
                    $data['formats'][] = array(
                        "type" => (string) trim($value),
                        "url" => (string) $value->identifier
                    );
                } else {
                    $data['formats'][] = (string) $value;
                }
            } else {
                $data[$key] = (string) $value;
            }
        }

        return $data;
    }
}