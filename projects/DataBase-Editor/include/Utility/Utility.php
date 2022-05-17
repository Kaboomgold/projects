<?php
	class Utility {

        public static function ArrayToHTMLTable(array $array) : string {
            
            foreach ($array as $element){
                     
			}

            return '';
        }

        public static function removeAssosiativeArrayElements(array $array) : array {
            foreach($array as $key => $value){
                if(!is_int($key)){
                    unset($array[$key]);  
                } 
            }
            return $array;
        }

        public static function PrntRay(array $array) : void {
            echo '<pre>'.print_r($array, true).'</pre>';
		}

        public static function validate(string $key, array $superGlobal) : bool {
            return (isset($superGlobal[$key]))? !empty($superGlobal[$key]) : false;
		}
	}

    
?>