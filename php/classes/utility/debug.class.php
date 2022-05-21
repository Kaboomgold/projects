<?php
    namespace Debug {
        class Debug {
            private static $logs = [];
            
            public static function log($item, $item_name) {

                self::$logs[] = ['log' => print_r($item, true), 'name'=>$item_name];

            }


            /**
             * Shows all logged items.
             * @return string HTML string of the logged item.
             */
            public static function show() {
                ?> 
                <style>
                    .debug-log {
                        width: 300px;
                        height: 220px;
                        background-color: gray;
                        border-radius: 20px;
                        position: fixed;
                        left: 10px;
                        top: 10px;
                        z-index: 9000;
                        overflow: hidden;
                        border: 4px solid gray;
                    }

                    .debug-log .debug-log-top {
                        background-color: silver;
                        width: 100%;
                    }

                    .debug-log .debug-log-top p {
                        padding: 10px;
                        margin: 0px;
                    }

                    .debug-log .logs {
                        padding: 5px;
                        overflow: auto;
                        color: greenyellow;
                        height: 100%;
                        background-color: black;
                    }

                    .debug-log .logs pre {
                        margin: 0px;
                    }
                </style>
                <div class="debug-log"> 
                    <div class="debug-log-top">
                        <p>debug logger</p>
                    </div>
                    <div class="logs">
                        <pre><?php 
                            foreach(self::$logs as $log) {
                                print_r($log['log']);
                            }?> 
                        </pre>
                    </div>
                </div> 
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
                            e.preventDefault();

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

                            //left handle
                            if(initial_event.clientX - rect.left < handle_width) {
                                element.style.width = `${rect.width - (e.clientX - offsetX)}px`;
                                element.style.left = `${rect.left + (e.clientX - rect.left)}px`;
                            }

                            //right handle
                            if(initial_event.clientX > rect.width - handle_width) {
                                element.style.width = `${rect.width + (e.clientX - offsetX)}`;
                            }

                            //bottom handle
                            if(initial_event.offsetY > rect.height - handle_width) {
                                element.style.height = `${rect.height + (e.clientY - offsetY)}`;
                            }

                        });
                    }


                    class Gizmo {
                        static gizmo_id = 0;

                        _element = document.createElement('div');

                        constructor(gizmo_color) {
                            this._element.classList.add(`gizmo_${Gizmo.gizmo_id}`); 
                            this.#set_styling_base();
                            this._element.style.backgroundColor = gizmo_color;

                            document.body.append(this._element);

                            this.gizmo_id++;
                        }

                        #set_styling_base() {
                            this._element.style.position = 'fixed';
                            this._element.style.left = '0px';
                            this._element.style.top = '0px';
                            this._element.style.zIndex = 1000000;
                            this._element.style.pointerEvents = 'none';
                        }

                        get domElement() {
                            return this._element;
                        }

                        set_pos_left(int_pos) {
                            this._element.style.left = `${int_pos}px`;
                        }

                        set_pos_top(int_pos) {
                            this._element.style.top = `${int_pos}px`;
                        }
                    }

                    class Gizmo_Rect extends Gizmo {

                        constructor(gizmo_color) {
                            super(gizmo_color);
                        }

                        set_width(int_px) {
                            this._element.style.width = `${int_px}px`;
                        }

                        set_height(int_px) {
                            this._element.style.height = `${int_px}px`;
                        }

                    }

                    class Gizmos {

                        #gizmos = [];

                        add_rect_gizmo(color) {
                            const gizmo = new Gizmo_Rect(color);
                            this.#gizmos.push(gizmo);
                            return gizmo;
                        }
                    }
                    
                    
                    // function addGizmos(element) {
                    //     handle_width = 7;

                    //     const gizmos = new Gizmos();
                    //     const handle_right_gizmo = gizmos.add_rect_gizmo('rgba(255, 0, 0, 0.4)');
                    //     const handle_bottom_gizmo = gizmos.add_rect_gizmo('rgba(255, 0, 0, 0.4)');
                    //     const handle_left_gizmo = gizmos.add_rect_gizmo('rgba(255, 0, 0, 0.4)');

                    //     handle_right_gizmo.set_width(handle_width);
                    //     handle_bottom_gizmo.set_height(handle_width);
                    //     handle_left_gizmo.set_width(handle_width);

                    //     add_drag_event(element, (e, rect, offsetX, offsetY) => {
                    //         const {left, top, width, height} = element.getBoundingClientRect();
                    //         handle_right_gizmo.set_pos_left(left + width - handle_width);
                    //         handle_right_gizmo.set_pos_top(top);
                    //         handle_right_gizmo.set_height(height);

                    //         handle_left_gizmo.set_pos_left(left);
                    //         handle_left_gizmo.set_pos_top(top);
                    //         handle_left_gizmo.set_height(height);
                    //     });

                    //     add_drag_event(document.querySelector('.debug-log-top > p'), (e, rect, offsetX, offsetY) => {
                    //         const {left, top, width, height} = element.getBoundingClientRect();
                    //         handle_right_gizmo.set_pos_left(left + width - handle_width);
                    //         handle_right_gizmo.set_pos_top(top);
                    //         handle_right_gizmo.set_height(height);

                    //         handle_left_gizmo.set_pos_left(left + handle_width);
                    //         handle_left_gizmo.set_pos_top(top);
                    //         handle_left_gizmo.set_height(height);
                    //     });
                    // }
                    // addGizmos(document.querySelector('.debug-log'));

                    const debug_logger = document.querySelector('.debug-log');
                    const debug_logger_handle = document.querySelector('.debug-log-top > p');

                    addSimpleDrag(debug_logger, debug_logger_handle);
                    resizer(debug_logger, 60);

                    
                </script>
                
                <?php
            }
        }
    }