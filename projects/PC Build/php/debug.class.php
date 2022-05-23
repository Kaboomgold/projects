<?php
    namespace PHP_Debug {
        class Debug {
            private static $item_group_id = -1;
            private static $log_items = [];
            private static $log_id = 0;
            
            public static function log($item, $item_group_name = 'general') {
                if(!isset(self::$log_items[$item_group_name])) {
                    self::$item_group_id++;
                }

                $debug_info = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS)[0];

                ob_start(); ?>
                <table>
                    <tr>
                        <td>logged in</td>
                        <td>:</td>
                        <td><?=$debug_info['file']; ?></td>
                    </tr>
                    <tr>
                        <td>on line</td>
                        <td>:</td>
                        <td><?=$debug_info['line']; ?></td>
                    </tr>
                </table>
                <?php $debug_table = ob_get_clean();

                self::$log_items[$item_group_name][] = ['log' => print_r($debug_table, true)."\n\r".'<pre>'.print_r($item, true).'</pre>', 'item_group_id'=>self::$item_group_id];
                self::$log_id++;
            }

            private function set_styling() {
                ?>
                <style>
                    .debug-log {
                        min-width: 300px;
                        min-height: 220px;
                        background-color: gray;
                        border-radius: 20px;
                        position: fixed;
                        left: 10px;
                        top: 10px;
                        z-index: 9000;
                        overflow: hidden;
                        border: 4px solid gray;
                        display: flex;
                        flex-direction: column;
                        box-sizing: border-box;
                        font-family: system-ui;
                    }

                    .debug-log .debug-log-top {
                        background-color: silver;
                        width: 100%;
                    }

                    .debug-log .debug-log-top p {
                        padding: 10px;
                        margin: 0px;
                    }

                    .debug-log .logs-wrapper {
                        overflow: auto;
                        color: greenyellow;
                        height: 100%;
                        background-color: black;
                    }

                    .debug-log .logs-wrapper::-webkit-scrollbar {
                        width: 5px;
                        height: 5px;
                    }

                    .debug-log .logs-wrapper::-webkit-scrollbar-thumb {
                        background-color: greenyellow;
                    }

                    .debug-log .logs-wrapper .log-menu {
                        border-bottom: 1px solid yellowgreen;
                        position: sticky;
                        top: 0px;
                        background-color: black;
                    }

                    .debug-log .logs-wrapper .log-menu ul {
                        margin: 0px;
                        padding: 5px;
                        list-style-type: none;
                        display: flex;
                    }

                    .debug-log .logs-wrapper .log-menu ul li {
                        margin: 0px;
                        border: 2px solid greenyellow;
                        padding: 5px;
                        margin-left: 5px;
                    }

                    .debug-log .logs-wrapper .log-menu ul li:first-child {
                        margin-left: 0px;
                    }

                    .debug-log .logs-wrapper .log-menu ul li:hover {
                        cursor: pointer;
                    }

                    .debug-log .logs-wrapper .log-menu ul li.active {
                        color: black;
                        background-color: greenyellow;
                    }

                    .debug-log .logs-wrapper .logs .log {
                        display: none;
                        padding: 10px;
                        border-bottom: 4px double;
                    }

                    .debug-log .logs-wrapper .logs .log.active {
                        display: block;
                    }

                    .debug-log .logs-wrapper .logs table td {
                        color: yellowgreen;
                        padding-right: 5px;
                    }

                    .debug-log .logs-wrapper pre {
                        margin: 0px;
                        font-family: system-ui;
                        margin-top: 10px;
                    }
                </style>
                <?php
            }

            private function set_javascript() {
                ?>

                <script>
                    function addSimpleDrag(element, initiator = null) {

                        if(initiator == null) {
                            initiator = element;
                        }

                        initiator.addEventListener('mousedown', e => {
                            e.stopPropagation();
                            e.preventDefault();

                            if(initiator) {
                                if(e.target != initiator) return;
                            } else {
                                if(e.target != element) return;
                            }

                            const abort_controller = new AbortController();
                            const { offsetX, offsetY } = e;

                            window.addEventListener('mousemove', e => {
                                element.style.left = `${e.clientX - offsetX}px`;
                                element.style.top = `${e.clientY - offsetY}px`;
                            }, { signal: abort_controller.signal });

                            window.addEventListener('mouseup', e => {
                                abort_controller.abort();
                            }, { signal: abort_controller.signal });
                        });
                    }

                    function add_drag_event(element, callback) {
                        element.addEventListener('mousedown', e => {

                            const initial_event = e;
                            const abb_controller = new AbortController();
                            const rect = element.getBoundingClientRect();
                            const offsetX = e.clientX;
                            const offsetY = e.clientY;

                            window.addEventListener('mousemove', e => {
                                callback(initial_event, e, rect, offsetX, offsetY);
                                }, { signal: abb_controller.signal });

                            window.addEventListener('mouseup', e => {
                                abb_controller.abort();
                            }, { signal: abb_controller.signal });
                        })
                    }

                    function resizer(element, handle_width = 15) {
                        add_drag_event(element, (initial_event, e, rect, offsetX, offsetY) => {
                            e.stopPropagation();
                            initial_event.stopPropagation();
                            element.style.cursor = '';

                            //left handle
                            if(initial_event.offsetX < handle_width) {
                                e.preventDefault();
                                element.style.width = `${(rect.width - (e.clientX - offsetX)) - initial_event.offsetX}px`;
                                element.style.left = `${(rect.left + (e.clientX - rect.left)) - initial_event.offsetX}px`;
                            }

                            //right handle
                            if(initial_event.offsetX > rect.width - handle_width) {
                                e.preventDefault();
                                element.style.width = `${rect.width + (e.clientX - offsetX)}`;
                            }

                            //bottom handle
                            const offset_height = (rect.top + rect.height) - handle_width;
                            if(initial_event.clientY > offset_height) {
                                e.preventDefault();
                                element.style.height = `${rect.height + (e.clientY - offsetY)}px`;
                            }

                        });
                    }

                    function select_show() {
                        const log_menu_items = [...document.querySelectorAll('.log-menu ul > li')];
                        let active_log_menu_item = document.querySelector('.log-menu ul > li.active');
                        let active_log_items = [...document.querySelectorAll('.logs-wrapper .log.active')];

                        log_menu_items.forEach(log_menu_item => {
                            log_menu_item.addEventListener('click', e => {
                                if(active_log_menu_item) {
                                    active_log_menu_item.classList.remove('active');
                                }

                                const log_menu_item_id = log_menu_item.getAttribute('data-log-id');
                                log_menu_item.classList.add('active');
                                active_log_menu_item = log_menu_item;

                                if(active_log_items) {
                                    active_log_items.forEach(active_log_item => {
                                        active_log_item.classList.remove('active');
                                    });
                                }

                                const log_items = [...document.querySelectorAll('.log[data-log-id=\\3'+log_menu_item_id+' ]')];
                                
                                log_items.forEach(log_item => {
                                    log_item.classList.add('active');
                                });

                                active_log_items = log_items;
                            });
                        });
                    }

                    function save_debug_settings() {
                        const {width, height, left, top} = debug_logger.getBoundingClientRect();

                        const debug_settings = {
                            width: width,
                            height: height,
                            left: left,
                            top: top
                        }

                        localStorage.setItem('debug_log_saved_settings', JSON.stringify(debug_settings));
                    }

                    function load_debug_settings() {

                        let debug_log_saved_settings = JSON.parse(localStorage.getItem('debug_log_saved_settings'));

                        if(debug_log_saved_settings) {
                            debug_logger.style.width = `${debug_log_saved_settings.width}px`;
                            debug_logger.style.height = `${debug_log_saved_settings.height}px`;
                            debug_logger.style.top = `${debug_log_saved_settings.top}px`;
                            debug_logger.style.left = `${debug_log_saved_settings.left}px`;
                        }
                    }

                    const debug_logger = document.querySelector('.debug-log');
                    const debug_logger_handle = document.querySelector('.debug-log-top > p');

                    addSimpleDrag(debug_logger, debug_logger_handle);
                    resizer(debug_logger, 30);
                    select_show();
                    load_debug_settings();

                    window.addEventListener('mouseup', e => {
                        save_debug_settings();
                    });
                    
                    if(window.addEventListener('keydown', e => {
                        
                        if(e.key == 'Dead') {
                            let initial_display = '';

                            if(debug_logger.style.display != 'none') {
                                initial_display = debug_logger.style.display;
                                debug_logger.style.display = 'none';
                            } else {
                                debug_logger.style.display = initial_display;
                            }
                        }
                    }));
                </script>

                <?php
            }

            /**
             * Shows all logged items.
             * @return string HTML string of the logged item.
             */
            public static function show() {
                self::set_styling();

                ?> 
                <div class="debug-log"> 
                    <div class="debug-log-top">
                        <p>debug logger</p>
                    </div>
                    <div class="logs-wrapper">
                        <div class="log-menu">
                            <ul>
                                <?php 
                                    foreach(self::$log_items as $group_name => $logs) { 
                                        $log = $logs[0];
                                    ?>
                                    <li class="<?=($log['item_group_id'] == 0)? 'active' : ''; ?>" data-log-id="<?=$log['item_group_id']; ?>"><?=$group_name; ?></li>
                                <?php }?>
                            </ul>
                        </div>
                        <div class="logs">
                            <?php foreach(self::$log_items as $group_name => $logs) { 
                                    foreach($logs as $log) {
                                ?>

                                    <div class="log <?=($log['item_group_id'] == 0)? 'active' : ''; ?>" data-log-id="<?=$log['item_group_id']; ?>">
                                        <?=$log['log']; ?>
                                    </div>
                                
                            <?php   } 
                                } ?> 
                        </div>
                    </div>
                </div> 
                <?php

                self::set_javascript();
            }
        }
    }