<?php

    class Debugger {
        static private $allInfo = [];

        static public function Log($info) {
            self::$allInfo[] = $info;
        }

        static public function GetDebuggerInfo() {
            $html = '<div style=" 
                position: absolute; 
                right: 0px; 
                top: 0px; 
                width: 300px; 
                height: 125px; 
                background-color: rgba(150,150,150,0.6); 
                z-index: 700;
                padding: 10px;
                overflow-y: auto;
                overflow-x: none;
                ">';

            
            foreach(self::$allInfo as $info) {
                $html .= '<p style="
                border-bottom: 1px solid black;    
                ">'.$info.'</p>';
            }
            
            $html .= '</div>';

            return $html;
        }

    }

?>