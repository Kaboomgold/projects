<?php

namespace PC_Builder\PC\PC_Part {

    class PC_Part {
        protected string $name = '';
        protected float $price = 0;
        protected string $type;

        public function __construct(string $name, float $price) {
            $this -> name = $name;
            $this -> price = $price;
            $this -> type = PC_Part_type::$NONE;
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
    }
    
}