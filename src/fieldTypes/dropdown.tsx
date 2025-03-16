import { useEffect } from 'react';

import { FormFieldDto } from '../formsClient';

import { useFormState } from '../providers/formsStateProvider';
import { FieldValue } from '../types/formStateTypes';
import { checkBoolSettings } from '../utils/formUtils';

export default function Dropdown({ field }: { field: FormFieldDto }) {
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

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'validateUpdateField', value: e.target.value, field });
  };

  function options() {
    return (
      <>
        {defaultValue === '' &&
          checkBoolSettings(field.settings, 'allowMultipleSelections', false) && (
            <option disabled value="">
              -
            </option>
          )}
        {field.preValues.map((option) => (
          <option key={option.value} value={option.value}>
            {option.caption}
          </option>
        ))}
      </>
    );
  }

  return checkBoolSettings(field.settings, 'allowMultipleSelections') ? (
    <MultipleDropdown defaultValue={defaultValue} field={field} onChange={onChange}>
      {options()}
    </MultipleDropdown>
  ) : (
    <SingleDropdown defaultValue={defaultValue} field={field} onChange={onChange}>
      {options()}
    </SingleDropdown>
  );
}

function SingleDropdown({
  onChange,
  field,
  children,
  defaultValue,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  field: FormFieldDto;
  children: React.ReactNode;
  defaultValue: FieldValue | undefined;
}) {
  return (
    <select
      autoComplete={field.settings.autocomplete ?? undefined}
      className="umb-h-input"
      defaultValue={defaultValue}
      id={field.id}
      name={field.caption.replace(' ', '-').toLocaleLowerCase()}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

function MultipleDropdown({
  onChange,
  field,
  children,
  defaultValue,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  field: FormFieldDto;
  children: React.ReactNode;
  defaultValue: FieldValue | undefined;
}) {
  return (
    <select
      autoComplete={field.settings.autocomplete ?? undefined}
      className="umb-h-input"
      defaultValue={defaultValue}
      id={field.id}
      multiple
      name={field.alias}
      onChange={onChange}
    >
      {children}
    </select>
  );
}
