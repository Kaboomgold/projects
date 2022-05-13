<?php

namespace PC_Builder\PC\PC_Part\Part {
    use PC_Builder\PC\PC_Part\PC_Part;
    use PC_Builder\PC\PC_Part\PC_Part_Type;

    class Motherboard extends PC_Part {

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

        private function set_stat_defaults() {
            $this -> stats = [
                'socket' => '',
                'memory_clock_speed' => '',
                'memory_storage_capacity' => '',
                'graphics_card_interface' => '',
                'memory_slots' => '',
                'wireless_type' => '',
                'maximum_power_consumption' => '',
                'type_ram' => '',
                'ram_slots' => '',
                'form_factor' => '',
                'number_of_memory_channels' => '',
                'build_in_graphics' => '',
                'chipset' => '',
                'memory_speed' => '',
                'voltage_ram' => '',
                'os' => '',
                'pci_slots' => '',
                'pci_express_x1_slots' => '',
                'pci_express_x4_slots' => '',
                'pci_express_x8_slots' => '',
                'pci_express_x16_slots' => '',
                'nvidia_sli' => '',
                'amd_crossfirex' => '',
                'killernic' => '',
                'case_fan_connectors' => '',
                'chipset_cooler' => '',
                'audio_processor' => '',
                'number_of_subwoofer_channels' => '',
                'number_of_audio_channels' => '',
                'number_of_m.2_connectors' => '',
                'raid' => '',
                'firewire' => '',
                'integrated_wifi' => '',
                'bluetooth' => '',
                'ethernet' => '',
                'number_of_ethernet_ports' => '',
                'lightning_peripherals' => '',
                'zone_lighting' => '',
                'Lighting_connectable_with_peripherals' => '',
                'zones_separately_lit' => '',
                'numbers_of_colors_lighting' => '',
            ];
        }

        public function __construct() {
            $this -> type = PC_Part_type::MOTHERBOARD;
            $this -> set_stat_defaults();
        }
    }
}