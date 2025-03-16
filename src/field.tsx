import { FormFieldDto, FormFieldIndication } from './formsClient';

import { FieldComponents } from './fieldTypes/FieldComponents';
import { useFormState } from './providers/formsStateProvider';

function RenderField({ field }: { field: FormFieldDto }) {
  const Component = FieldComponents[field.type.name];

  if (!Component) {
    return <p key={field.id}>{field.type.name}</p>;
  }

  return <Component field={field} key={field.id} />;
}

export default function Field({ field }: { field: FormFieldDto }) {
  const {
    state: { formState, form },
  } = useFormState();

  const thisField = formState.fields[field.id];

  return (
    <>
      {field.caption && field.settings.showLabel && (
        <div className="umb-h-fieldCaption">
          <h2>{field.caption}</h2>
          {field.required
            ? form.fieldIndicationType === FormFieldIndication.MARK_MANDATORY_FIELDS && (
                <span className="umb-h-indicator">{form.indicator}</span>
              )
            : form.fieldIndicationType === FormFieldIndication.MARK_OPTIONAL_FIELDS && (
                <span className="umb-h-indicator">{form.indicator}</span>
              )}
        </div>
      )}
      {RenderField({ field })}
      {field.helpText && <span className="umb-h-helpText">{field.helpText}</span>}
      {!form.hideFieldValidation && thisField && thisField.required && (
        <p className="umb-h-requiredMessage">{field.requiredErrorMessage}</p>
      )}
      {!form.hideFieldValidation && thisField && !thisField.valid && (
        <p className="umb-h-patternInvalidMessage">{field.patternInvalidErrorMessage}</p>
      )}
    </>
  );
}
