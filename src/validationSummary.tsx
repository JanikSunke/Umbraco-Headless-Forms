import { useFormState } from './providers/formsStateProvider';
import FormStateToModel from './utils/formUtils';

export default function ValidationSummary() {
  const {
    state: { formState, form },
  } = useFormState();

  const fields = FormStateToModel(form);

  return (
    <ul className="umb-h-validationSummary">
      {Object.values(formState.fields).map(
        (field) =>
          (field.required || !field.valid) && (
            <li key={field.name}>
              {fields.find((f) => f.alias === field.name)?.requiredErrorMessage}
            </li>
          ),
      )}
    </ul>
  );
}
