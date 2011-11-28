<?php
// Imports all *.json files from output in couchdb
require 'class-http-request.php';
require 'class-couch-simple.php';

$couch = new CouchSimple(array(
    "host" => "localhost",
    "port" => "5984"
));

$dir = dir("./output");
while ( ($entry = $dir->read()) !== false) {
    if (substr($entry, -5) == ".json") {
        $json = json_decode( file_get_contents("./output/$entry"), true );
        foreach($json as $record) {
            $id = $record['identifier'];

            // Parse height / material, diameter
            foreach ($record['formats'] as $format) {
                if (is_array($format)) continue;

                if (strpos($format, "hoogte") === 0) {
                    $pieces = explode(" ", $format);
                    // God, sigh
                    preg_match("/\d+/", $format, $a);
                    $record['height'] = $a[0];
                }

                if (strpos($format, "breedte") === 0) {
                    $pieces = explode(" ", $format);
                    preg_match("/\d+/", $format, $a);
                    $record['width'] = $a[0];
                }
            }

            $resp = $couch->send("PUT", "/rijksmuseum/$id", json_encode($record));
            echo $resp;
        }
    }
}
$dir->close();