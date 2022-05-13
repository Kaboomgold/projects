<?php

namespace PC_Builder\PC {
    use PC_Builder\PC\PC_Part;

    class PC {
        private array $parts = [];
        private float $total_price = 0;
        private array $processors = [];

        public function add_pc_part(PC_Part $part) {
            $this -> total_price += $part.price();
            $this -> parts[$part -> type()][] = $part;
        }

        public function get_total_price() : float {
            return $total_price;
        }
    }

}