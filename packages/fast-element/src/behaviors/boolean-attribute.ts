import { BindingDirective } from "../directives/bind";
import { BindingBase } from "./binding-base";

export class BooleanAttributeBinding extends BindingBase {
    constructor(directive: BindingDirective, private target: HTMLElement) {
        super(directive);
    }

    updateTarget(value: unknown) {
        (value as boolean)
            ? this.target.setAttribute(this.directive.targetName!, "")
            : this.target.removeAttribute(this.directive.targetName!);
    }
}
