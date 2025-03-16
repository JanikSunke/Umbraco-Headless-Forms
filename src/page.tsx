import { FormPageDto } from './formsClient';

import FormCondition from './conditions/FormCondition';
import Field from './field';

export default function Page({ page, currentPage }: { page: FormPageDto; currentPage: boolean }) {
  return page.fieldsets.map((fieldset) => (
    <div key={fieldset.id} style={{ display: currentPage ? 'block' : 'none' }}>
      <FormCondition condition={fieldset.condition} key={fieldset.id}>
        <fieldset>
          {fieldset.caption && <legend className="umb-h-legend">{fieldset.caption}</legend>}
          {fieldset.columns.map((container) => (
            <div className="umb-h-container" key={container.width}>
              {container.fields.map((field) => (
                <FormCondition className="" condition={field.condition} key={field.id}>
                  <Field field={field} />
                </FormCondition>
              ))}
            </div>
          ))}
        </fieldset>
      </FormCondition>
    </div>
  ));
}
