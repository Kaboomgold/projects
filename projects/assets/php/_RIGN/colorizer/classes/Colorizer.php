<?php

class Colorizer {

    private string $fileLoc = '';
    private string $html = '';

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
        $line = '<span style="color: rgb(255, 255, 255);">'.$line.'</span>';

        $indentCount = strlen($line)-strlen(ltrim($line));
        $colorized_line = $this -> convert_begin_indentation($line);

        return $line;
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

}