class Menu {
    #elm_menu;
    #elm_optionsMenu;

    constructor(elm_menu) {
        this.#elm_menu = elm_menu;
        this.#elm_optionsMenu = elm_menu.querySelector('#menu-options');
    }

    AddOption(Option_option) {

        switch(Option_option.GetType()) {
            case 'button': {
                const wrapper = document.createElement('div');
                const button = document.createElement('div');
                button.className = Option_option.GetClassName();
                button.textContent = Option_option.GetText();
                 
                wrapper.append(button);

                if(Option_option.GetSettings() != null) {
                    const settings = Option_option.GetSettings();
                    
                    this.#elm_optionsMenu.append(settings.GetMenu());
                    wrapper.append(settings.GetMenuBtn());
                }

                button.addEventListener('click', e => {
                    Option_option.Action();
                });

                wrapper.className = 'option-wrapper';
                this.#elm_menu.append(wrapper);
            }
                break;
        }
    }
}

export { Menu }
