import { FormFieldDto } from '~/ec-core/formsClient';
import { FormDto } from '~/ec-core/umbracoClient';

export function checkBoolSettings(settings: Record<string, string>, key: string, present = true) {
  const firstChar = present.toString()[0]?.toUpperCase();

  if (!firstChar) return false;

  return settings[key] === firstChar + present.toString().substring(1);
}

export default function FormStateToModel(state: FormDto): FormFieldDto[] {
  return state.pages.flatMap((page) => {
    return page.fieldsets.flatMap((fieldset) => {
      return fieldset.columns.flatMap((column) => {
        return column.fields;
      });
    });
  });
}
