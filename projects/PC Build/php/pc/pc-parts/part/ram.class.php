<?php

namespace PC_Builder\PC\PC_Part\Part {
    use PC_Builder\PC\PC_Part\PC_Part;
    use PC_Builder\PC\PC_Part\PC_Part_Type;

    class Ram extends PC_Part {

        const INTERNAL_RAM = 'internal_ram';
        const STORAGE_SUITABLE_FOR = 'storage_suitable_for';
        const MEMORY_COMPOSITION = 'memory_composition';
        const RAM_MEMORY_TYPE = 'ram_memory_type';
        const CAS_LATENCY_MEMORY_MODULE = 'cas_latency_memory_module';
        const MEMORY_TYPE = 'memory_type';
        const MEMORY_SPEED = 'memory_speed';
        const VOLTAGE_RAM = 'voltage_ram';
        const COMPATIBLE_WITH_OPERATING_SYSTEM = 'compatible_with_operating_system';
        const PINS = 'pins';

        private function set_stat_defaults() {
            $this -> stats = [
                'internal_ram' => '',
                'storage_suitable_for' => '',
                'memory_composition' => '',
                'ram_memory_type' => '',
                'cas_latency_memory_module' => '',
                'memory_type' => '',
                'memory_speed' => '',
                'voltage_ram' => '',
                'compatible_with_operating_system' => '',
                'pins' => '',
            ];
        }

        public function __construct() {
            $this -> type = PC_Part_type::RAM;
            $this -> set_stat_defaults();
        }
    }

}