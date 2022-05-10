class ContextMenuBase {
    _options = [];
    _elm_contextMenu = document.createElement('div');
    _groups = {};

    constructor() {
        this._elm_contextMenu.className = 'contextmenu';
    }
    
    /**
    * Gets the menu domElement.
    * @return { Element }  
    */
    GetContextMenu() {
        return this._elm_contextMenu;
    }

    /**
    * Adds a option to the menu.
    * @public
    * @param { ContextMenuOption } option
    */
    AddOption(arr_option, groupName = null) {
        for(let i = 0; i < arr_option.length; i++) {
            if(groupName != null) {

                if(groupName in this._groups) {
                    this._groups[groupName].push(arr_option[i]);
                } else {
                    console.error(`${groupName} does not exist.`);
                }
            } else {
                this._elm_contextMenu.append(arr_option[i].GetContextMenuOption());
            }
    
            this._options.push(arr_option[i]);
        }
    }

    AddGroup(groupName) {
        this._groups[groupName] = [];
    }

}

export { ContextMenuBase }