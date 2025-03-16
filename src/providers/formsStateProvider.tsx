'use client';

import * as React from 'react';

import { FormDto } from '../formsClient';

import Form from '../form';
import { Action, Dispatch, FieldContext } from '../types/formStateProviderTypes';
import { FieldState } from '../types/formStateTypes';
import FormStateToModel from '../utils/formUtils';

const FormContext = React.createContext<{ state: FieldContext; dispatch: Dispatch } | undefined>(
  undefined,
);

function formStateReducer(state: FieldContext, action: Action) {
  switch (action.type) {
    case 'validateUpdateField': {
      if (!action.field) return state;

      const hasValue = action.value && action.value.length > 0;
      let validPattern = true;

      if (hasValue && action.field.pattern) {
        const pattern = new RegExp(action.field.pattern);

        validPattern = pattern.test(
          Array.isArray(action.value) ? action.value.join(',') : (action.value ?? ''),
        );
      }

      return {
        ...state,
        formState: {
          ...state.formState,
          fields: {
            ...state.formState.fields,
            [action.field.id]: {
              name: action.field.alias,
              value: action.value,
              required: !hasValue && action.field.required,
              valid: validPattern,
              files: action.files,
            },
          },
        },
      };
    }

    case 'registerField': {
      if (!action.field) return state;

      const newState = {
        ...state,
        formState: {
          ...state.formState,
          fields: {
            ...state.formState.fields,
            [action.field.id]: {
              name: action.field.alias,
              value: action.value ?? '',
              required: false,
              valid: true,
              files: action.files,
            },
          },
        },
      };

      return newState;
    }

    case 'unregisterField': {
      if (!action.field) return state;

      const filteredFields: Record<string, FieldState> = {};

      Object.entries(state.formState.fields).forEach(([id, field]) => {
        if (field.name !== action.field?.alias) {
          filteredFields[id] = field;
        }
      });

      return {
        ...state,
        formState: {
          ...state.formState,
          fields: filteredFields,
        },
      };
    }

    case 'validateForm': {
      if (!action.form) {
        return state;
      }

      const formFields = FormStateToModel(action.form);

      const fieldValues = state.formState.fields;

      Object.entries(fieldValues).forEach(([id, field]) => {
        const hasValue = field.value && field.value.toString().length > 0;

        const formField = formFields.find((f) => f.id === id);

        if (!formField) return;

        fieldValues[id] = {
          ...field,
          required: !hasValue && formField.required,
        };
      });

      const isValid = Object.values(fieldValues).every((field) => {
        return !field.required || (field.value && field.value.toString().length > 0 && field.valid);
      });

      return {
        ...state,
        formValid: isValid,
      };
    }

    case 'resetForm': {
      return {
        ...state,
        formValid: false,
        formSubmitted: true,
        formState: {
          fields: {},
        },
      };
    }

    default: {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      throw new Error(`Unhandled action type: ${action.type as unknown as string}`);
    }
  }
}

function FormStateProvider({ form }: { form: FormDto }) {
  const [state, dispatch] = React.useReducer(formStateReducer, {
    formValid: false,
    formSubmitted: false,
    formState: { fields: {} },
    form,
  });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };

  return (
    <FormContext.Provider value={value}>
      <Form form={form} />
    </FormContext.Provider>
  );
}

function useFormState() {
  const context = React.useContext(FormContext);

  if (context === undefined) {
    throw new Error('useFormState must be used within a FormStateProvider');
  }

  return context;
}

export { FormStateProvider, useFormState };
