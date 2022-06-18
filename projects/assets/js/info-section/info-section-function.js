import { Info_Section } from "./Info_Section.js";

class Info_Section_Function extends Info_Section {
    static INFO_TYPE = "function";

    #add_parameter_button = document.createElement('button');
    #remove_param_btn = document.createElement('button');
    #parameter_wrapper = document.createElement('span');
    #parameter_id = 0;

    constructor(asset_name) {
        super(asset_name);
        this._section_name = 'function';

        this.#init_elements();
        this.#add_parameter_event();
        this.#delete_parameter_event();
    }

    #init_elements() {
        const wrapper = document.createElement('div');

        const p = document.createElement('span');
        p.textContent = 'function ';
        p.className = 'keyword_function';
        
        const op = document.createElement('span');
        op.textContent = ' (';
        const cp = document.createElement('span');
        cp.textContent = ') :';

        const name_function = this._add_input('name_function', 'text');
        name_function.className = 'function_name';

        const return_type = this._add_select('return_type', [
            'void',
            'bool',
            'array',
            'int'
        ]);
        return_type.className = 'return-type';

        const function_description = this._add_textarea('function_description');
        function_description.className = 'function-description';

        this.#add_parameter_button.textContent = '+';
        this.#add_parameter_button.classList.add('add-param-button');

        this.#remove_param_btn.textContent = '-';
        this.#remove_param_btn.classList.add('remove-param-button');

        const param_btn_wrapper = document.createElement('span');
        param_btn_wrapper.className = 'param-btns';
        param_btn_wrapper.append(this.#add_parameter_button, this.#remove_param_btn);

        this.#parameter_wrapper.append(param_btn_wrapper);
        this.#parameter_wrapper.classList.add('parameter');

        wrapper.append(p, name_function, op, this.#parameter_wrapper, cp, return_type, function_description);
        this._section_element.append(wrapper, this._update_btn, this._delete_btn);
        this._section_element.classList.add('function');
    }


    #add_parameter_event() {
        this.#add_parameter_button.addEventListener('click', e => {
            this.#add_parameter();
        });
    }

    #delete_parameter_event() {
        this.#remove_param_btn.addEventListener('click', e => {
            const inputs = [...this.#parameter_wrapper.querySelectorAll('select, input')];

            let remove_keys = [];

            inputs.forEach(input => {
                remove_keys.push(input.name);
                input.remove();
            });

            this.Remove_key(remove_keys);
        });
    }

    #add_parameter() {
        let param_id = this.#parameter_id;

        this.add_variable_type_input('data_type_'+param_id);
        this.add_variable_name_input('variable_name_'+param_id);

        this.#parameter_id++;
    }

    add_variable_type_input(name, value = '') {
        const data_type_selection = this._add_select(name, [
            'void',
            'bool',
            'int',
            'array'
        ], value);

        data_type_selection.className = 'data-type';
        this.#parameter_wrapper.append(data_type_selection);
        this.#parameter_wrapper.append(document.createTextNode(' '));
    }

    add_variable_name_input(name, value = '') {
        const variable_name = this._add_input(name, 'text', value);

        variable_name.className = 'parameter_var_name';
        this.#parameter_wrapper.append(variable_name);
        this.#parameter_wrapper.append(document.createTextNode(' '));
    }

    create_dynamic_inputs(key, value) {
        if(key.match(/data_type/)) {
            this.add_variable_type_input(key, value);
        }   

        if(key.match(/variable_name/)) {
            this.add_variable_name_input(key, value);
        }
    }
}

export { Info_Section_Function }