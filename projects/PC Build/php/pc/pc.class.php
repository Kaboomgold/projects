<?php

namespace PC_Builder\PC {
    use PC_Builder\PC\PC_Part\PC_Part;

    class PC {
        private array $parts = [];
        private float $total_price = 0;
        private array $processors = [];

        public function add_pc_part(PC_Part $part) {
            $this -> total_price += $part-> get_price();
            $this -> parts[$part -> get_type()][] = $part;
        }

        public function get_price() : float {
            return $this -> total_price;
        }
    }

}