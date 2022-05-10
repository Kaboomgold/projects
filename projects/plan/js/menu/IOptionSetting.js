import { Interface } from "../general/Interface.js";

class IOptionSetting extends Interface {
    constructor(currclass) {
        super(currclass);
        this.HasMethod('GetSettingsObj');
    }
}

export { IOptionSetting }