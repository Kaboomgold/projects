
/**
 * A static class that contains method for common dom manipulations.
 * @static
 */
class Dom_Utils {

    /**
     * Adds selecting functionality to a group of dom elements.
     * @param { Array }  items     An array of dom elements that can be selected from.
     * @param { string } className Classname to be apleid to the selected dom element.
     * @static
     */
    static domElementSelector(items, className = 'active') {
        for (let i = 0; i < items.length; i++) {
    
            items[i].addEventListener('click', () => {
        
                items.forEach(link => {
                    link.classList.remove(className);
                });
        
                items[i].classList.add(className);
            });
        }
    }

    static addSimpleDragTouch(element) {
        element.addEventListener('touchstart', e => {
            const abort_controller = new AbortController();

            const rect = element.getBoundingClientRect();
            const offsetX = (e.touches[0].clientX - rect.left);
            const offsetY = (e.touches[0].clientY - rect.top);

            window.addEventListener('touchmove', e => {
                element.style.left = `${e.touches[0].clientX - offsetX}px`;
                element.style.top = `${e.touches[0].clientY - offsetY}px`;
            }, { signal: abort_controller.signal, passive: true});

            window.addEventListener('touchend', e => {
                abort_controller.abort();
            }, { signal: abort_controller.signal, passive: true });
        }, { passive: true });
    }

    static addSimpleDrag(element) {
        element.addEventListener('mousedown', e => {
            
            if(e.target != element) return;

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

    static element(element_obj) {
        let element = document.createElement('div');

        for( const [key, value] of Object.entries(element_obj)) {

            switch(key) {
                case 'tagName': {
                    element = document.createElement(value);
                }
                    break;
                case 'children': { 
                    let child_type = 'append';

                    if(typeof(value) == 'array') {
                        for(let i = 0; i < value.length; i++) {

                            if(value[i] == 'prepend') {
                                child_type = 'prepend';
                            } else if (value[i] == 'append') {
                                child_type = 'prepend';
                            }

                            if(child_type == 'append') {
                                element.append(value[i]);
                            } else {
                                element.prepend(value[i]);
                            }
                        }
                    } else {
                        element.append(value);
                    }
                    
                }
                    break;
                default: {
                    element[key] = value;
                }
            }

        }

        return element;
    }
}

export { Dom_Utils };