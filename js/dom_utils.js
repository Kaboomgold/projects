
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
                element.style.left = `${e.touches[0].clientX - (offsetX)}px`;
                element.style.top = `${e.touches[0].clientY - (offsetY)}px`;
            }, { signal: abort_controller.signal, passive: true});

            window.addEventListener('touchend', e => {
                abort_controller.abort();
            }, { signal: abort_controller.signal, passive: true });
        }, { passive: true });
    }

    static addSimpleDrag(element) {
        element.addEventListener('mousedown', e => {
            e.preventDefault();
            const abort_controller = new AbortController();
            const { offsetX, offsetY } = e;

            window.addEventListener('mousemove', e => {
                e.preventDefault();
                element.style.left = `${e.clientX - (offsetX)}px`;
                element.style.top = `${e.clientY - (offsetY)}px`;
            }, { signal: abort_controller.signal });

            window.addEventListener('mouseup', e => {
                e.preventDefault();
                abort_controller.abort();
            }, { signal: abort_controller.signal });
        });
    }
}

export { Dom_Utils };