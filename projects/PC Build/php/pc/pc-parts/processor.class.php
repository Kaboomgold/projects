<?php

namespace PC_Builder\PC\PC_Part\Processor {
    use PC_Builder\PC\PC_Part as PC_Part;

    class Processor extends PC_Part\PC_Part {

        static $SOCKET = 'socket';
        static $CLOCK_SPEED = 'clock_speed';
        static $TURBO_SPEED = 'turbo_speed';
        static $OVERCLOCKABLE = 'overclockable';
        static $MAXIMUM_POWER_CONSUMPTION = 'maximum_power_consumption';
        static $CACHE_MEMORY = 'cache_memory';
        static $CORES = 'cores';
        static $THREADS = 'threads';
        static $TYPE_RAM = 'type_ram';
        static $BUILD_IN_GRAPHICS = 'build_in_graphics';

        private array $stats = [
            'socket' => '',
            'clock_speed' => '',
            'turbo_speed' => '',
            'overclockable' => '',
            'maximum_power_consumption' => '',
            'cache_memory' => '',
            'cores' => '',
            'threads' => '',
            'type_ram' => '',
            'build_in_graphics' => ''
        ];

        public function __construct() {
            $this -> type = PC_Part\PC_Part_type::$PROCESSOR;
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