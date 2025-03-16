import { useEffect } from 'react';

import { FormFieldDto } from '../formsClient';
import {
  UndefinedIfEmpty,
  UndefinedIfEmptyNumber,
} from '../helpers/stringHelpers';
import { useFormState } from '../providers/formsStateProvider';

export default function LongAnswer({ field }: { field: FormFieldDto }) {
  const {
    state: { formState },
    dispatch,
  } = useFormState();
  const defaultValue = formState.fields[field.id]?.value ?? field.settings.defaultValue ?? '';

  useEffect(() => {
    dispatch({ type: 'registerField', value: defaultValue.toString(), field });

    // Cleanup function to handle unmounting (when field becomes invisible)
    return () => {
      dispatch({ type: 'unregisterField', field });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'validateUpdateField', value: e.target.value, field });
  };

  return (
    <textarea
      autoComplete={field.settings.autocomplete ?? undefined}
      className="umb-h-input"
      cols={20}
      defaultValue={defaultValue}
      id={field.id}
      maxLength={UndefinedIfEmptyNumber(field.settings.maxLength)}
      name={field.alias}
      onChange={onChange}
      placeholder={UndefinedIfEmpty(field.settings.placeholder)}
      rows={UndefinedIfEmptyNumber(field.settings.numberOfRows, 5)}
    />
  );
}
