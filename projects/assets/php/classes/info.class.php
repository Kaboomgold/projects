<?php

    abstract class Info {
        protected $values = [];
        protected $info_type = '';

        public function __construct($info_type, $values)
        {

        }

        abstract public function get_html() : string;


    }

    class InfoDescription extends Info {

        public function __construct()
        {
            parent::__construct('description', []);   
        }

        public function get_html() : string
        {
            ob_start();
            ?>
                <div>
                    <p>function()</p>
                </div>
            <?php
            return ob_get_clean();
        }

    }