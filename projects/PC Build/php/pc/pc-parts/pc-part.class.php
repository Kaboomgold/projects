<?php

namespace PC_Builder\PC\PC_Part {

    class PC_Part {
        protected string $name = '';
        protected float $price = 0;
        protected string $type;
        protected array $stats;

        public function __construct(string $name, float $price) {
            $this -> name = $name;
            $this -> price = $price;
            $this -> type = PC_Part_type::NONE;
        }

        public function price() : float {
            return $this -> price;
        }

        public function name() : string{
            return $this -> name;
        }

        public function type() {
            return $this -> type;
        }

        public function get_stats() {
            return $this -> stats;
        }

        public function set_stats(array $stats) {
            foreach($stats as $stat_name => $stat_value) {
                if(isset($this -> stats[$stat_name])) {
                    $this -> stats[$stat_name] = $stat_value;
                } else {
                    echo $stat_name.' is not compatible';
                }
            }
        }
    }
    
}