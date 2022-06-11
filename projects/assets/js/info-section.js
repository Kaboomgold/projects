
import { AjaxHandler } from "./ajax-handler.js";
import { Dom_Utils } from "../../../js/dom_utils.js";

class Info_Section_Handler {

    static info_section_ajax_handler = '../assets/php/_RIGN/ajax/add-info-section.php';
    static section_classes = [];
    #info_section_container = document.querySelector('.info-container');
    #target_asset_name = '';
    #info_sections = [];

    constructor(asset_name) {
        this.#target_asset_name = asset_name;
        this.#info_section_container.innerHTML = '';

        this.generate_info_sections();
    }

    add_info_section_by_info_type(info_type) {
        const classes = Info_Section_Handler.section_classes;
        for(let i = 0; i < classes.length; i++) {

            if(info_type == classes[i].INFO_TYPE) {
                this.add_info_section(classes[i]);
            }
        }
    }

    generate_info_sections() {
        AjaxHandler.Ajax_JSON_Request(Info_Section_Handler.info_section_ajax_handler, response => {
            const info_sections = JSON.parse(response);

            const classes = Info_Section_Handler.section_classes;
            for(const [id, info_section] of Object.entries(info_sections)) {
                for(let i = 0; i < classes.length; i++) {

                    if(info_section.info_type == classes[i].INFO_TYPE) {
                        const info_obj = this.add_info_section(classes[i]);
                        info_obj.section_id = id;
                        info_obj.set_value(info_section.values);
                    }
                }
            }

        }, { name: this.#target_asset_name, action: 'get' });
    }

    add_info_section(info_section) {
        const info_section_obj = new info_section(this.#target_asset_name);
        this.#info_sections.push(info_section_obj);
        this.#info_section_container.append(info_section_obj.domElement);
        return info_section_obj;
    }

    change_section_value(name, value) {
        this.#info_sections.forEach(info_section => {
            if(info_section.Name == name) {
                info_section.section_value = value;
                info_section.Update();
            } else {
                console.warn(`No info section found with that name.`);
            }
        });
    }
}

class Info_Section {
    
    static gen_section_id = 0;
    
    #asset_name = '';

    _inputs = [];
    _section_element = document.createElement('div');
    _wrapper = document.createElement('wrapper');
    _section_name = '';
    _update_btn = document.createElement('button');
    _delete_btn = document.createElement('button');

    section_id = 0;
    section_value = '';

    constructor(target_asset_name) {
        this.#asset_name = target_asset_name;
        this.INFO_TYPE = this.constructor.name;
        if(this.section_id == 0){
            Info_Section.gen_section_id++;
            this.section_id = Info_Section.gen_section_id;
        }
        this.#set_buttons();
    }

    get domElement() {
        return this._section_element;
    }

    get Name() {
        return this._section_name;
    }

    static register_class(class_name) {
        Info_Section_Handler.section_classes.push(class_name);
    }

    #set_buttons() {
        this._update_btn.type = 'button';
        this._update_btn.className = 'update';
        this._update_btn.textContent = 'Update';
        
        this._delete_btn.type = 'button';
        this._delete_btn.className = 'delete';
        this._delete_btn.textContent = 'Delete';

        this._update_btn.addEventListener('click', e => {
            this.Update();
        });

        this._delete_btn.addEventListener('click', e => {
            this.Remove();
        });
    }

    #create_section_obj(action_type) {
        let obj = {
            name: this.#asset_name,
            action: action_type,
            info_sections: {}
        }

        obj.info_sections["id"] = this.section_id;

        obj.info_sections['info'] = {};
        obj.info_sections['info']['info_type'] = this._section_name;
        obj.info_sections['info']['values'] = {};

        this._inputs.forEach(input => {
            if('group_name' in input) {
                if(!obj.info_sections['info']['values'][input.group_name]) {
                    obj.info_sections['info']['values'][input.group_name] = {};
                }
                obj.info_sections['info']['values'][input.group_name][input.inner_input.name] = input.inner_input.value;
            } else {

                obj.info_sections['info']['values'][input.name] = input.value;
            }
        });

        console.log(obj);

        return obj;
    }

    _add_input(name, type, input_group_name = '') {
        const input = document.createElement('input');
        input.name = name;
        input.type = type;

        if(input_group_name == '') {
            this._inputs.push(input);
        } else {
            this._inputs.push({group_name: input_group_name, inner_input: input});
        }
        return input;
    }

    _add_select(name, options, input_group_name = '') {
        const select = document.createElement('select');
        select.name = name;

        options.forEach(option_text => {
            let option = document.createElement('option');
            option.textContent = option_text;
            option.value = option_text;
            select.append(option);
        })

        if(input_group_name == '') {
            this._inputs.push(select);
        } else {
            this._inputs.push({group_name: input_group_name, inner_input: select});
        }
        return select;
    }

    Update() {
        AjaxHandler.Ajax_JSON_Request(Info_Section_Handler.info_section_ajax_handler, response => {
            console.log(response);
        }, this.#create_section_obj('add'));
    }

    Remove() {
        this._section_element.remove();
        AjaxHandler.Ajax_JSON_Request(Info_Section_Handler.info_section_ajax_handler, response => {
            console.log(response);
        }, this.#create_section_obj('remove'));
    }

    Remove_key(keys) {
        let section_object = this.#create_section_obj('remove_key');
        section_object.info_sections['key'] = keys;
        
        AjaxHandler.Ajax_JSON_Request(Info_Section_Handler.info_section_ajax_handler, response => {
            console.log(response);
        }, section_object);
    }

    set_value(values) {

        console.log(values);

        const keys = Object.keys(values);
        console.log(keys);

        keys.forEach(key => {
            if(key != 'info_type') {

                this._inputs.forEach(input => {
                    if(input.name == key) {
                        input.value = values[key];
                    }
                });


                if(values[key]) {
                    console.log(key, values[key]);
                    this.create_dynamic_inputs(key, values[key]);
                }
            }
        });
    }

    create_dynamic_inputs(key, value) {
        return null;
    }

}

class Info_Section_Description extends Info_Section {
    static INFO_TYPE = "description";
    static { this.register_class(this) }

    constructor(asset_name) {
        super(asset_name);
        this._section_name = 'description';
        this.#init_elements();
    }

    #init_elements() {
        const wrapper = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = 'description';

        const description = this._add_input('description', 'textarea');
        const name = this._add_input('name', 'text');
        const type = this._add_select('type', [
            'int',
            'bool',
            'array'
        ]);

        wrapper.append(p, description, name, type);
        this._section_element.append(wrapper, this._update_btn, this._delete_btn);
    }

}

class Info_Section_Text extends Info_Section{
    static INFO_TYPE = "name";
    static { this.register_class(this) }

    constructor(asset_name) {
        super(asset_name);
        this._section_name = 'name';
        this.#init_elements();
    }

    #init_elements() {
        const wrapper = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = 'name';

        const text = this._add_input('name', 'text');

        wrapper.append(p, text);
        this._section_element.append(wrapper, this._update_btn, this._delete_btn);
    }
}

class Info_Section_Function extends Info_Section {
    static INFO_TYPE = "function";
    static { this.register_class(this) }

    #add_parameter_button = document.createElement('button');
    #remove_param_btn = document.createElement('button');
    #parameter_wrapper = document.createElement('div');
    #parameter_id = 0;
    #param_counter = null;

    constructor(asset_name) {
        super(asset_name);
        this._section_name = 'function';
        this.#init_elements();
        this.#add_parameter_event();
        this.#delete_parameter_event();

        this.#param_counter = this._add_input('param_count', 'hidden');
    }

    #init_elements() {
        const wrapper = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = 'function ';

        const name_function = this._add_input('name_function', 'text');

        this.#parameter_wrapper.append(this.#add_parameter_button, this.#remove_param_btn);
        wrapper.append(p, name_function, this.#parameter_wrapper);
        this._section_element.append(wrapper, this._update_btn, this._delete_btn);
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

    #add_parameter(id = 0) {

        let param_id = (id == 0)? this.#parameter_id : id;

        this.add_variable_type_input('data_type_'+param_id);
        this.add_variable_name_input('variable_name_'+param_id);

        this.#parameter_id++;
    }

    #remove_param() {

    }

    add_variable_type_input(name, value = '') {
        const data_type_selection = this._add_select(name, [
            'bool',
            'int',
            'array'
        ]);

        if(value) {
            data_type_selection.value = value;
        }

        this.#parameter_wrapper.append(data_type_selection);
    }

    add_variable_name_input(name, value = '') {
        const variable_name = this._add_input(name, 'text');

        if(value) variable_name.value = value;

        this.#parameter_wrapper.append(variable_name);
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

export { Info_Section_Handler }