<?php

namespace PC_Builder\PC\PC_Part\Part {
    use PC_Builder\PC\PC_Part\PC_Part;
    use PC_Builder\PC\PC_Part\PC_Part_Type;
    use PC_Builder\PC\PC_Part\Part\Processor;

    class Motherboard extends PC_Part {

        // stats
        const SOCKET = 'socket';
        const MEMORY_CLOCK_SPEED = 'memory_clock_speed';
        const MEMORY_STORAGE_CAPACITY = 'memory_storage_capacity';
        const GRAPHICS_CARD_INTERFACE = 'graphics_card_interface';
        const MEMORY_SLOTS = 'memory_slots';
        const WIRELESS_TYPE = 'wireless_type';
        const MAXIMUM_POWER_CONSUMPTION = 'maximum_power_consumption';
        const RAM_SLOTS = 'ram_slots';
        const TYPE_RAM = 'TYPE_RAM';
        const FORM_FACTOR = 'form_factor';
        const NUMBER_OF_MEMORY_CHANNELS = 'number_of_memory_channels';
        const BUILD_IN_GRAPHICS = 'build_in_graphics';
        const CHIPSET = 'chipset';
        const MEMORY_SPEED = 'memory_speed';
        const VOLTAGE_RAM = 'voltage_ram';
        const OS = 'os';
        const PCI_SLOTS = 'pci_slots';
        const PCI_EXPRESS_X1_SLOTS = 'pci_express_x1_slots';
        const PCI_EXPRESS_X4_SLOTS = 'pci_express_x4_slots';
        const PCI_EXPRESS_X8_SLOTS = 'pci_express_x8_slots';
        const PCI_EXPRESS_X16_SLOTS = 'pci_express_x16_slots';
        const NVIDIA_SLI = 'nvidia_sli';
        const AMD_CROSSFIREX = 'amd_crossfirex';
        const KILLERNIC = 'killernic';
        const CASE_FAN_CONNECTORS = 'case_fan_connectors';
        const CHIPSET_COOLER = 'chipset_cooler';
        const AUDIO_PROCESSOR = 'audio_processor';
        const NUMBER_OF_SUBWOOFER_CHANNELS = 'number_of_subwoofer_channels';
        const NUMBER_OF_AUDIO_CHANNELS = 'number_of_audio_channels';
        const NUMBER_OF_M2_CONNECTORS = 'number_of_m2_connectors';
        const RAID = 'raid';
        const FIREWIRE = 'firewire';
        const INTEGRATED_WIFI = 'integrated_wifi';
        const BLUETOOTH = 'bluetooth';
        const ETHERNET_SPEED = 'ethernet_speed';
        const NUMBER_OF_ETHERNET_PORTS = 'number_of_ethernet_ports';
        const LIGHTNING_PERIPHERALS = 'lightning_peripherals';
        const ZONE_LIGHTING = 'zone_lighting';
        const LIGHTING_CONNECTABLE_WITH_PERIPHERALS = 'Lighting_connectable_with_peripherals';
        const ZONES_SEPARATELY_LIT = 'zones_separately_lit';
        const NUMBERS_OF_COLORS_LIGHTING = 'numbers_of_colors_lighting';

        private $processor = null;

        public function __construct() {
            $this -> type = PC_Part_type::MOTHERBOARD;
            $this -> set_stat_defaults(__CLASS__);
        }

        public function add_component($component) {
            $comp_stats = $component -> get_stats();

            if($component instanceof Processor) {
                $this -> processor = $component;
            }
        }
    }
}