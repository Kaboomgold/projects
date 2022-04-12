<?php

/**
 * CSharpColorizer is for colorizing C# scripts.
 * It scans through the script and uses regex to find keywords on each line.
 * Gives the proper colors to each line and returns a html structure with inline css.
 * 
 * Example: 
 * $CSC = CSarpColorizer($path_to_file);
 * $html = $CSC->GetList();
 * 
 * @author Eloy Bartels
 * @access public
 */
class CSharpColorizer {
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
        $keywords = "class|private|protected|public|namespace|using|interface|return|get|set";
        $types = "int|string|bool|double|float|array|void";
        $variables = "\w+(?=\s=)";
        $values = "(?<=\s=\s).+(?=;)";
        $className = "(?<=class ).+(?<!;)";
        $usingSpace = "(?<=using ).+(?<!;)";
        $namespace = "(?<=namespace ).+";
        $functionName = "[A-Z]\w+(?=\s\()|[A-Z]\w+(?=\()";
        $argumentVariables = "\w+(?=,)|\w+(?=\s+,)|\w+(?=\))|\w+(?=\s+\))";
        $returnValues = "(?<=return ).+(?=;)";
        $rest = "[\}\{\"\;\,\(\)\.\:]|\=+";

        preg_match_all("/($keywords)|($types)|($variables)|($values)|($className)|($usingSpace)|($functionName)|($namespace)|($argumentVariables)|($returnValues)|($rest)/", $line, $matchesr);
        
        $values = [
            'all_strings'        => array_filter( $matchesr[0] ),
            'keywords'           => array_filter( $matchesr[1] ),
            'types'              => array_filter( $matchesr[2] ),
            'variables'          => array_filter( $matchesr[3] ),
            'values'             => array_filter( $matchesr[4] ),
            'class_name'         => array_filter( $matchesr[5] ),
            'using_space'        => array_filter( $matchesr[6] ),
            'function_name'      => array_filter( $matchesr[7] ),
            'namespace'          => array_filter( $matchesr[8] ),
            'argument_variables' => array_filter( $matchesr[9] ),
            'return_values'      => array_filter( $matchesr[10]),
            'rest'               => array_filter( $matchesr[11]),
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
                case 'types':
                case 'keywords': {
                    foreach($value as $index => $newValue) {
                        $arrs[$index] = '<span style="color: rgb(100, 209, 255);">'.$newValue.'</span> ';
                    }
                    
                }
                    break;
                case 'class_name':
                case 'namespace':
                case 'using_space': {
                    foreach($value as $index => $newValue) {
                        $arrs[$index] = '<span style="color: rgb(97, 214, 191);">'.$newValue.'</span>';
                    }
                }
                    break;
                case 'variables': 
                case 'argument_variables': 
                case 'return_values': {
                    foreach($value as $index => $newValue) {
                        $arrs[$index] = '<span style="color: rgb(167, 229, 255);">'.$newValue.'</span>';
                    }
                }
                    break;
                case 'values': {
                    foreach($value as $index => $newValue) {
                        $arrs[$index] = '<span style="color: rgb(181, 206, 168);">'.$newValue.'</span>';
                    }
                }
                    break;
                case 'function_name': {
                    foreach($value as $index => $newValue) {
                        $arrs[$index] = '<span style="color: rgb(220, 220, 170);">'.$newValue.'</span>';
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