import { FormDto, FormFieldDto } from '../formsClient';

import { FieldValue, FileValue, FormState } from './formStateTypes';

export interface FieldContext {
  formValid: boolean;
  formSubmitted: boolean;
  formState: FormState;
  form: FormDto;
}

export interface Action {
  type: ActionType;
  form?: FormDto;
  field?: FormFieldDto;
  value?: FieldValue;
  files?: FileValue[];
}

export type ActionType =
  | 'validateUpdateField'
  | 'validateForm'
  | 'resetForm'
  | 'registerField'
  | 'unregisterField';

export type Dispatch = (action: Action) => void;
