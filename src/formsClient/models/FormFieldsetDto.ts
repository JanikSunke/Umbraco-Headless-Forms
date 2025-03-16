/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormConditionDto } from './FormConditionDto';
import type { FormFieldsetColumnDto } from './FormFieldsetColumnDto';
export type FormFieldsetDto = {
    id: string;
    caption?: string | null;
    condition?: FormConditionDto;
    columns: Array<FormFieldsetColumnDto>;
};

