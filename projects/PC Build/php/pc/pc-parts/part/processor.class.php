<?php

namespace PC_Builder\PC\PC_Part\Part {
    use PC_Builder\PC\PC_Part\PC_Part;
    use PC_Builder\PC\PC_Part\PC_Part_Type;

    class Processor extends PC_Part {

        // stats
        const SOCKET = 'socket';
        const CLOCK_SPEED = 'clock_speed';
        const TURBO_SPEED = 'turbo_speed';
        const OVERCLOCKABLE = 'overclockable';
        const MAXIMUM_POWER_CONSUMPTION = 'maximum_power_consumption';
        const CACHE_MEMORY = 'cache_memory';
        const CORES = 'cores';
        const THREADS = 'threads';
        const TYPE_RAM = 'type_ram';
        const BUILD_IN_GRAPHICS = 'build_in_graphics';

        public function __construct() {
            $this -> type = PC_Part_type::PROCESSOR;
            $this -> set_stat_defaults(__CLASS__);
        }
    }

}