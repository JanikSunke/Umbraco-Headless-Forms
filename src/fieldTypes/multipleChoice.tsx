import { useEffect } from 'react';

import { FormFieldDto } from '../formsClient';
import {
  UndefinedIfEmpty,
  UndefinedIfEmptyNumber,
} from '../helpers/stringHelpers';
import { useFormState } from '../providers/formsStateProvider';

export default function MultipleChoice({
  field,
  multiple,
}: {
  field: FormFieldDto;
  multiple: boolean;
}) {
  const {
    state: { formState },
    dispatch,
  } = useFormState();
  const defaultValue =
    formState.fields[field.id]?.value ??
    (field.settings.defaultValue ?? '').split(',').map((v) => v.trim());

  useEffect(() => {
    dispatch({ type: 'registerField', value: defaultValue, field });

    // Cleanup function to handle unmounting (when field becomes invisible)
    return () => {
      dispatch({ type: 'unregisterField', field });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Array.isArray(defaultValue) ? defaultValue : defaultValue.split(',');

    if (value.includes(e.target.value)) {
      dispatch({
        type: 'validateUpdateField',
        value: value.filter((v) => v !== e.target.value),
        field,
      });
    } else {
      dispatch({
        type: 'validateUpdateField',
        value: [...value, e.target.value],
        field,
      });
    }
  };

  return (
    <>
      {field.preValues.map((option) => (
        <div className="flex gap-2 w-full" key={option.value}>
          <label htmlFor={option.value}>{option.caption}</label>
          <input
            autoComplete={field.settings.autocomplete ?? undefined}
            className="umb-h-select"
            defaultChecked={defaultValue.includes(option.value)}
            id={option.value}
            max={UndefinedIfEmptyNumber(field.settings.maxLength)}
            name={field.alias}
            onChange={onChange}
            placeholder={UndefinedIfEmpty(field.settings.placeholder)}
            type={multiple ? 'checkbox' : 'radio'}
            value={option.value}
          />
        </div>
      ))}
    </>
  );
}
