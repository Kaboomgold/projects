<?php

namespace PC_Builder\PC\PC_Part {

    class PC_Part {
        protected string $name = '';
        protected float $price = 0;
        protected string $type = '';
        protected array $stats= [];

        public function __construct(string $name, float $price) {
            $this -> name = $name;
            $this -> price = $price;
            $this -> type = PC_Part_type::NONE;
        }

        public function get_price() : float {
            return $this -> price;
        }

        public function get_name() : string{
            return $this -> name;
        }

        public function get_type() : string {
            return $this -> type;
        }

        public function get_stats() : array {
            return $this -> stats;
        }

        /**
         * If the stat is available for the component set it.
         * @param array $stats An array of stats to set.
         * @access public
         */
        public function set_stats(array $stats) {
            foreach($stats as $stat_name => $stat_value) {
                if(isset($this -> stats[$stat_name])) {
                    $this -> stats[$stat_name] = $stat_value;
                } else {
                    echo $stat_name.' is not compatible';
                }
            }
        }

        /**
         * Returns all class constant stats.
         * @param class $class A class with constants.
         * @return array An array of constants.
         * @access protected
         * @see RelfectionClass
         */
        protected function get_available_stats($class) {
            $RClass = new \ReflectionClass($class);
            return $RClass -> getConstants();
        }

        /**
         * Sets the stats with a default of a class {@link PC_Part}.
         * @param class $class A class of witch the stats need to be set.
         * @access protected
         * @see get_available_stats()
         */
        protected function set_stat_defaults($class) {
            $stats = $this -> get_available_stats($class);
            foreach($stats as $stat) {
                $this -> stats[$stat] = '';
            }
        }
    }
    
}