<?php

// Bindet das Skript 130_extract.php für Rohdaten ein
$geladeneDaten = include('extract.php');

$loaddata = array();

foreach($geladeneDaten["data"] as $standort){

    $loaddata[] = [$standort["name"], $standort["counter"]];
    
}

return $loaddata;