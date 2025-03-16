/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormConditionDto } from './FormConditionDto';
import type { FormFieldPrevalueDto } from './FormFieldPrevalueDto';
import type { FormFieldTypeDto } from './FormFieldTypeDto';
import type { FormFileUploadOptionsDto } from './FormFileUploadOptionsDto';
export type FormFieldDto = {
    id: string;
    caption: string;
    helpText?: string | null;
    cssClass?: string | null;
    alias: string;
    required: boolean;
    requiredErrorMessage?: string | null;
    pattern?: string | null;
    patternInvalidErrorMessage?: string | null;
    condition?: FormConditionDto;
    fileUploadOptions?: FormFileUploadOptionsDto;
    preValues: Array<FormFieldPrevalueDto>;
    settings: Record<string, string>;
    type: FormFieldTypeDto;
};

