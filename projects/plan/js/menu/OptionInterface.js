import { Interface } from "../general/Interface.js";

export class OptionInterface extends Interface {
    constructor(currentClass) {
        super(currentClass);
        this.HasMethod('Action', this);
        this.HasMethod('GetSettings', this);
        this.HasMethod('GetType', this);
        this.HasMethod('GetText', this);
        this.HasMethod('GetClassName', this);
    }
}