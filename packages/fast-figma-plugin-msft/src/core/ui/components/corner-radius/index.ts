import { attr, css, customElement, FastElement, html } from "@microsoft/fast-element";

const template = html<CornerRadius>`
    <template class="${x => x.orientation}" style="--radius: ${x => x.value}">
        <div class="indicator"></div>
        <slot></slot>
    </template>
`;

const styles = css`
    :host {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        text-align: center;
        color: var(--neutral-foreground-hint);
    }

    .indicator {
        width: 32px;
        height: 32px;
        position: relative;
        overflow: hidden;
    }

    .indicator::before {
        content: "";
        display: block;
        width: 200%;
        height: 200%;
        border: 4px solid black;
        border-radius: calc(var(--radius) * 3px);
    }

    :host(.vertical) {
        flex-direction: column;
        max-width: 58px;
    }

    :host(.vertical) .indicator {
        margin-bottom: 8px;
    }

    :host(.horizontal) .indicator {
        margin-inline-end: 8px;
    }

    :host(:hover) {
        cursor: pointer;
    }
`;

@customElement({
    name: "td-corner-radius",
    template,
    styles,
})
export class CornerRadius extends FastElement {
    @attr
    public value: string = "0";

    @attr
    public orientation: "vertical" | "horizontal" = "vertical";
}