class ContextMenuOption {
    #elm_option = document.createElement('div');
    #elm_item = document.createElement('div');
    #elm_name = document.createElement('div');
    #elm_expandArrow = document.createElement('div');
    #hasSubMenu = false;
    #submenu = null;
    callable_action = null;

    constructor(name, callback = null) {
        this.#elm_option.className = 'contextmenu-option';
        this.#elm_name.textContent = name;
        this.callable_action = callback;

        this.#elm_name.className = 'name';
        this.#elm_expandArrow.className = 'expand-arrow';
        
        this.#elm_option.append(
            this.#elm_item,
            this.#elm_name,
            this.#elm_expandArrow
        );

        this.#SetupEvent();
    }

    #SetupEvent() {
        this.#elm_option.addEventListener('click', e => {
            if(e.currentTarget == this.#elm_option) {
                this.Action(e);
            }
        });
    }

    GetSubMenu() {
        return this.#submenu;
    }

    HasSubMenu() {
        return this.#hasSubMenu;
    }

    GetName() {
        return this.#elm_name;
    }

    GetContextMenuOption() {
        return this.#elm_option;
    }

    Action(e) {
        if(typeof(this.callable_action) == 'function') {
            this.callable_action(e);
        }
    }

    AddSubMenu(submenu) {
        this.#hasSubMenu = true;
        this.#submenu = submenu;
        this.#elm_expandArrow.textContent = '>';

        const cm = submenu.GetContextMenu();
        this.#elm_option.append(cm);

        return submenu;
    }
}

export { ContextMenuOption }