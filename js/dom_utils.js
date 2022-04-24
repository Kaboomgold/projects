
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
}

export { Dom_Utils };