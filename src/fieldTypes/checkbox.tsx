import { clsx } from 'clsx';
import { useEffect } from 'react';

import { FormFieldDto } from '../formsClient';
import {
  UndefinedIfEmpty,
  UndefinedIfEmptyNumber,
} from '../helpers/stringHelpers';
import { useFormState } from '../providers/formsStateProvider';

export default function CheckBox({ field }: { field: FormFieldDto }) {
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'validateUpdateField', value: e.target.value, field });
  };

  return (
    <label className="flex gap-2" htmlFor={field.id}>
      <span className="sr-only">{field.settings.acceptCopy ?? field.caption}</span>
      <span
        dangerouslySetInnerHTML={{
          __html: field.settings.acceptCopy ?? field.caption,
        }}
      />
      <input
        autoComplete={field.settings.autocomplete ?? undefined}
        className={clsx('umb-h-select', field.settings.acceptCopy ? 'order-first' : '')}
        defaultChecked={defaultValue !== ''}
        id={field.id}
        max={UndefinedIfEmptyNumber(field.settings.maxLength)}
        name={field.alias}
        onChange={onChange}
        placeholder={UndefinedIfEmpty(field.settings.placeholder)}
        type="checkbox"
      />
    </label>
  );
}
