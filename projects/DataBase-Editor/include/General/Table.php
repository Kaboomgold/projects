<?php
    class Table {
        protected $array;
        protected $headers;
        public $caption;

        public function __construct(array $array, array $headers = []){
            $this->array = $array;
            $this->headers = $headers;
        }

        public function GetHTMLMarkup(){
            $table = '<table>';

            if(!empty($this->caption)){
                $table .= "<caption>$this->caption</caption>";
            }

            if(count($this->headers) > 0) {
                $table .= '<tr>';
                foreach($this->headers as $header) {
                    $table .= "<th>$header</th>";
                }
                $table .= '</tr>';
            }

            if(count($this->array) > 0) {
                foreach($this->array as $arrayitem) {
                    $table .= '<tr>';
                    foreach($arrayitem as $item){
                        $table .= "<td>$item</td>";
                    }
                    $table .= '</tr>';
                }
            }
            $table .= '</table>';

            return $table;
        }
    }

    trait Table2 {
        protected $array;
        protected $headers;
        public $caption;

        public function BuildTable(array $array, array $headers = []){
            $this->array = $array;
            $this->headers = $headers;
        }

        public function GetHTMLMarkup(){
            $table = '<table>';

            if(!empty($this->caption)){
                $table .= "<caption>$this->caption</caption>";
            }

            if(count($this->headers) > 0) {
                $table .= '<tr>';
                foreach($this->headers as $header) {
                    $table .= "<th>$header</th>";
                }
                $table .= '</tr>';
            }

            if(count($this->array) > 0) {
                foreach($this->array as $arrayitem) {
                    $table .= '<tr>';
                    foreach($arrayitem as $item){
                        $table .= "<td>$item</td>";
                    }
                    $table .= '</tr>';
                }
            }
            $table .= '</table>';

            return $table;
        }
    }
?>