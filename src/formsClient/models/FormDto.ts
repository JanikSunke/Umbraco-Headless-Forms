/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiContentRouteModel } from './ApiContentRouteModel';
import type { FormFieldIndication } from './FormFieldIndication';
import type { FormPageDto } from './FormPageDto';
export type FormDto = {
    id: string;
    name: string;
    indicator: string;
    cssClass?: string | null;
    nextLabel?: string | null;
    previousLabel?: string | null;
    submitLabel?: string | null;
    disableDefaultStylesheet: boolean;
    fieldIndicationType: FormFieldIndication;
    hideFieldValidation: boolean;
    messageOnSubmit?: string | null;
    messageOnSubmitIsHtml: boolean;
    showValidationSummary: boolean;
    gotoPageOnSubmit?: string | null;
    gotoPageOnSubmitRoute?: ApiContentRouteModel | null;
    pages: Array<FormPageDto>;
};

