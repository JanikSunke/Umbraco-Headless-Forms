/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FieldConditionActionType } from './FieldConditionActionType';
import type { FieldConditionLogicType } from './FieldConditionLogicType';
import type { FormConditionRuleDto } from './FormConditionRuleDto';
export type FormConditionDto = {
    actionType: FieldConditionActionType;
    logicType: FieldConditionLogicType;
    rules: Array<FormConditionRuleDto>;
};

