import { DOM } from "../dom";
import { SyntheticViewTemplate, CaptureType } from "../template";
import { SyntheticView } from "../view";
import { Expression } from "../interfaces";
import { Behavior } from "./behavior";
import {
    Observable,
    GetterInspector,
    inspectAndEvaluate,
} from "../observation/observable";
import { Subscriber } from "../observation/subscriber-collection";
import { Directive } from "./directive";

export class WhenDirective extends Directive {
    behavior = WhenBehavior;

    constructor(public expression: Expression, public template: SyntheticViewTemplate) {
        super();
    }

    public createPlaceholder(index: number) {
        return DOM.createLocationPlaceholder(index);
    }
}

export class WhenBehavior implements Behavior, GetterInspector, Subscriber {
    private location: Node;
    private view: SyntheticView | null = null;
    private cachedView?: SyntheticView;
    private source: unknown;

    constructor(private directive: WhenDirective, marker: HTMLElement) {
        this.location = DOM.convertMarkerToLocation(marker);
    }

    bind(source: unknown) {
        this.source = source;
        this.updateTarget(
            inspectAndEvaluate<boolean>(
                this.directive.expression,
                source,
                null as any,
                this
            )
        );
    }

    unbind() {
        if (this.view !== null) {
            this.view.unbind();
        }

        this.source = null;
    }

    inspect(source: any, propertyName: string) {
        Observable.getNotifier(source).subscribe(this, propertyName);
    }

    handleChange(source: any, propertyName: string): void {
        DOM.queueUpdate(this);
    }

    public call() {
        this.updateTarget(this.directive.expression(this.source, null as any));
    }

    updateTarget(show: boolean) {
        if (show && this.view == null) {
            this.view =
                this.cachedView || (this.cachedView = this.directive.template.create());
            this.view.bind(this.source);
            this.view.insertBefore(this.location);
        } else if (!show && this.view !== null) {
            this.view.unbind();
            this.view.remove();
            this.view = null;
        }
    }
}

export function when<T = any, K = any>(
    expression: Expression<T, K>,
    template: SyntheticViewTemplate
): CaptureType<T> {
    return new WhenDirective(expression, template);
}
