<?php

class Tommle_Parser {

    static function Parse(string $file_loc): array {

        $handle = fopen($file_loc, 'r');

        while(!feof($handle)) {
            $line = fgets($handle);


            // comments:         #.+
            // variables:        \w+(?=\s=)
            // non array values: (?<== )[^\[].+
            // classing:         [^= ]\[.+\]
            // array values:     (?<== )\[[\S\s]+?\]

        }


    }



}