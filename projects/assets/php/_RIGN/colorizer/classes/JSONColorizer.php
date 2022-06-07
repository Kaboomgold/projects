<?php

class JSONColorizer {
     /**
     * Sets the path to where the file is located.
     * Initializes the building of the html structure.
     * @param string $fileLoc Location of the script that needs to be colorized.
     * @access public
     */
    public function __construct($fileLoc) {
        $this -> fileLoc = $fileLoc;

        $this -> create_html();
    }

    /**
     * Gets the html structure.
     * @return string $html
     */
    public function GetList() {
        return $this->html;
    }

    /**
     * Creates the html structure and stores it in the $this->html property.
     */
    private function create_html() {
        $list = '<pre class="code-list" style="background-color: rgb(24, 24, 24);"><ol style="">';

        $handle = fopen($this -> fileLoc, 'r');
        $fileSize = filesize($this -> fileLoc);
        while(!feof($handle)) {
            $line = fgets($handle, $fileSize);
            $colorize_line = $this -> colorize_line($line);

            $list .= '<li><p>'.$colorize_line.'</p></li>';
        }

        $list .= '</ol></pre>';

        while(is_resource($handle)){
            fclose($handle);
        }
        
        $this -> html = $list;
    }

    /**
     * Colorizes a line of code.
     * @param  string $line The line to colorize.
     * @return string The colorized line.
     */
    private function colorize_line(string $line) : string {
        $arrs = $this -> colorize_values($this -> scan_line($line));

        $indentCount = strlen($line)-strlen(ltrim($line));
        $colorized_line = $this -> convert_begin_indentation($line);

        if(!empty($arrs)) {
            foreach($arrs as $index => $val) {
                $colorized_line .= $val;
            }
        }

        return $colorized_line;
    }

    /**
     * Transfers the begin indentation to a new string.
     * @param  string $line String where the indentation should be converted from.
     * @return string Line with the converted begin indentation.
     * @access private
     */
    private function convert_begin_indentation(string $line) : string {
        $indentCount = strlen($line)-strlen(ltrim($line));
        $colorized_line = '';
        
        for ($i=0; $i < $indentCount; $i++) {
            $colorized_line .= ' ';
        }

        return $colorized_line;
    }

    /**
     * Filters the keywords in a line and stores them in an array.
     * @param string $line Line to filter from.
     * @return array Array with filtered values.
     * @access private
     */
    private function scan_line(string $line) : array {
        $strings = "\".+?\"";
        $rest = "[\}\{\"\;\,\(\)\.\:]|\=+";

        preg_match_all("/($strings)|($rest)/", $line, $matchesr);
        
        $values = [
            'all_strings'        => array_filter( $matchesr[0] ),
            'strings'            => array_filter( $matchesr[1] ),
            'rest'               => array_filter( $matchesr[2] )
        ];

        return $values;
    }

    /**
     * Gives all values of a filtered array a span with the proper color.
     * @param string $values Array with filtered values.
     * @return array Array with keywords with a span element and proper color.
     * @access private
     */
    private function colorize_values(array $values) : array {
        $arrs = [];

        foreach($values as $key => $value) {
            if(empty($value)) {
                continue;
            }

            switch($key) {
                case 'strings': {
                    foreach($value as $index => $newValue) {
                        $arrs[$index] = '<span style="color: rgb(206, 145, 120);">'.$newValue.'</span>';
                    }
                }
                    break;
                default: {
                    foreach($value as $index => $newValue) {
                        $arrs[$index] = '<span style="color: white;">'.$newValue.'</span>';
                    }
                }
            }
        }

        return $arrs;
    }
}