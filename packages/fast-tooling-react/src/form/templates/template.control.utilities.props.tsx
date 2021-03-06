import { ErrorObject } from "ajv";
import { FormChildOptionItem } from "../form";
import { ControlType, StandardControlPlugin } from "../index";
import { AddExampleData, Controls } from "../controls/utilities/types";
import { BadgeType } from "./types";

export interface UpdateSectionConfig {
    /**
     * The lodash path location of the data in the schema
     */
    schemaLocation: string;

    /**
     * The lodash path location of the data
     */
    dataLocation: string;

    /**
     * The JSON schema
     */
    schema?: any;
}

export interface OnChangeConfig extends ControlOnChangeConfig {
    /**
     * The lodash path location of the data
     */
    dataLocation: string;
}

export interface ControlOnChangeConfig {
    /**
     * The new value for the supplied data location
     */
    value: any;

    /**
     * Whether this data is an array
     */
    isArray?: boolean;

    /**
     * The index if this data is an array
     */
    index?: number;
}

export type FormHTMLElement =
    | HTMLTextAreaElement
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLButtonElement;

export interface ControlTemplateUtilitiesProps
    extends NumberFieldTypeControlOptions,
        ListControlOptions,
        TextareaControlOptions,
        SectionLinkControlOptions,
        ArrayControlOptions,
        ChildrenControlOptions,
        AdditionalControlConfigOptions {
    /**
     * The index to assign as a React key for mapping
     */
    index: number;

    /**
     * The type of control
     */
    type: ControlType;

    /**
     * The location of the data
     */
    dataLocation: string;

    /**
     * The location of the data
     * in respect to the schema
     */
    schemaLocation: string;

    /**
     * The data
     */
    data: any;

    /**
     * The schema
     */
    schema: any;

    /**
     * Whether this item is required
     */
    required: boolean;

    /**
     * The label
     */
    label: string;

    /**
     * The label tooltip
     */
    labelTooltip?: string;

    /**
     * Whether this item is disabled
     */
    disabled?: boolean;

    /**
     * The passed onChange function
     */
    onChange: (config: OnChangeConfig) => void;

    /**
     * The update section callback
     */
    onUpdateSection: (config: UpdateSectionConfig) => void;

    /**
     * The default data (if available)
     */
    default?: any;

    /**
     * The const data (if available)
     */
    const?: any;

    /**
     * The badge to use next to a form items label
     */
    badge?: BadgeType;

    /**
     * The badge description which is used as an HTML title
     */
    badgeDescription?: string;

    /**
     * The validation message if the form item is invalid
     */
    invalidMessage: string;

    /**
     * The provided error message from ajv
     */
    validationErrors: ErrorObject[] | void;

    /**
     * Display the validation inline
     */
    displayValidationInline?: boolean;

    /**
     * Display the validation as browser default tooltips
     */
    displayValidationBrowserDefault?: boolean;

    /**
     * Enable soft remove
     * defaults to true
     */
    softRemove?: boolean;

    /**
     * Control plugins
     */
    controls: Controls;

    /**
     * The custom control plugins which will be used
     * instead of the default control plugins
     */
    controlPlugins?: StandardControlPlugin[];

    /**
     * A component dictionary to be used by type
     */
    controlComponents: { [key: string]: React.ComponentClass | React.FunctionComponent };

    /**
     * The string to be used if a prop is untitled
     */
    untitled?: string;
}

export interface CommonControlConfig {
    /**
     * The type of control
     */
    type: ControlType;

    /**
     * The location of the data referenced by lodash path syntax
     */
    dataLocation: string;

    /**
     * The value of the data to be assigned to the control
     */
    value: any;

    /**
     * The schema
     */
    schema: any;

    /**
     * The default value
     */
    default?: any;

    /**
     * The disabled flag for this control
     */
    disabled: boolean;

    /**
     * The required prop for this control
     */
    required: boolean;

    /**
     * The ref belonging to the form element injected as part of the control
     */
    elementRef: React.Ref<FormHTMLElement>;

    /**
     * The invalid error object
     */
    validationErrors: ErrorObject[] | void;

    /**
     * Display the validation inline
     */
    displayValidationInline?: boolean;

    /**
     * Callback for reporting validity on
     * the element that is assigned the ref
     */
    reportValidity: () => void;

    /**
     * Callback for updating validity on
     * the element that is assigned the ref
     */
    updateValidity: () => void;

    /**
     * Callback for handling the updating of the value
     */
    onChange: (config: ControlOnChangeConfig | OnChangeConfig) => void;
}

export interface NumberFieldTypeControlOptions {
    /**
     * The minimum value allowed
     */
    min?: number;

    /**
     * The maximum value allowed
     */
    max?: number;

    /**
     * The increment between steps
     */
    step?: number;
}

export interface ListControlOptions {
    /**
     * The select options
     */
    options?: any[];
}

export interface TextareaControlOptions {
    /**
     * The number of rows to assign to the textarea
     */
    rows?: number;
}

export interface SectionLinkControlOptions {
    /**
     * The location of the data
     * in respect to the schema
     */
    schemaLocation?: string;

    /**
     * The validation message if the form item is invalid
     */
    invalidMessage?: string;

    /**
     * The label
     */
    label?: string;

    /**
     * The update section callback
     */
    onUpdateSection?: (config: UpdateSectionConfig) => void;
}

export interface SectionControlOptions {
    /**
     * Control plugins
     */
    controls: Controls;

    /**
     * The custom control plugins which will be used
     * instead of the default control plugins
     */
    controlPlugins?: StandardControlPlugin[];

    /**
     * A component dictionary to be used by type
     */
    controlComponents: { [key: string]: React.ComponentClass | React.FunctionComponent };

    /**
     * The location in the schema
     */
    schemaLocation: string;

    /**
     * The optional components to be added as children
     */
    childOptions: any[];

    /**
     * The update event to trigger a new active section and/or component
     */
    onUpdateSection: (config: UpdateSectionConfig) => void;

    /**
     * The string to be used if a prop is untitled
     */
    untitled: string;

    /**
     * Display the validation as browser default tooltips
     */
    displayValidationBrowserDefault?: boolean;
}

export interface ArrayControlOptions {
    /**
     * The callback to add example data as an array item
     */
    onAddExampleData?: AddExampleData;

    /**
     * The minimum number of array items required
     */
    minItems?: number;

    /**
     * The maximum number of array items required
     */
    maxItems?: number;

    /**
     * The update section callback
     */
    onUpdateSection?: (config: UpdateSectionConfig) => void;

    /**
     * The location of the data
     * in respect to the schema
     */
    schemaLocation?: string;

    /**
     * The validation message if the form item is invalid
     */
    invalidMessage?: string;
}

export interface ChildrenControlOptions {
    /**
     * The potential children to be added
     */
    childOptions?: FormChildOptionItem[];

    /**
     * The default children to be added
     */
    defaultChildOptions?: string[];

    /**
     * The update section callback
     */
    onUpdateSection?: (config: UpdateSectionConfig) => void;
}

export interface AdditionalControlConfigOptions {
    component: React.ComponentClass | React.FunctionComponent;
}

export type NumberFieldTypeControlConfig = CommonControlConfig &
    NumberFieldTypeControlOptions;
export type ListControlConfig = CommonControlConfig & ListControlOptions;
export type TextareaControlConfig = CommonControlConfig & TextareaControlOptions;
export type SectionLinkControlConfig = CommonControlConfig & SectionLinkControlOptions;
export type SectionControlConfig = CommonControlConfig & SectionControlOptions;
export type ArrayControlConfig = CommonControlConfig & ArrayControlOptions;
export type ChildrenControlConfig = CommonControlConfig & ChildrenControlOptions;
export type ControlConfig = CommonControlConfig &
    NumberFieldTypeControlOptions &
    ListControlOptions &
    TextareaControlOptions &
    SectionLinkControlOptions &
    SectionControlOptions &
    ArrayControlOptions &
    ChildrenControlConfig &
    AdditionalControlConfigOptions;
