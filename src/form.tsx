import { FormEvent, useCallback, useEffect, useState } from "react";

import { FormDto, FormsResource } from "./formsClient";

import Page from "./page";
import PageSelector from "./pageSelector";
import { useFormState } from "./providers/formsStateProvider";
import { FileValue } from "./types/formStateTypes";
import ValidationSummary from "./validationSummary";

export default function Form({ form }: { form: FormDto }) {
  const {
    state: { formState, formValid, formSubmitted },
    dispatch,
  } = useFormState();
  // CurrentPage using hidden to prevent mount/unmount
  const [currentPage, setCurrentPage] = useState(0);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      dispatch({ type: "validateForm", form });
    },
    [form, dispatch]
  );

  useEffect(() => {
    const submit = async () => {
      if (formValid) {
        const values = Object.values(formState.fields).reduce<Record<string, string[] | FileValue[]>>((acc, field) => {
          if (!field.value) return acc;

          if (field.files) {
            acc[field.name] = field.files;

            return acc;
          }

          acc[field.name] = Array.isArray(field.value) ? field.value : [field.value.toString()];

          return acc;
        }, {});

        try {
          await FormsResource.postUmbracoFormsDeliveryApiV1Entries({
            id: form.id,
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            requestBody: { values } as unknown as { values: never },
          });
          dispatch({ type: "resetForm" });
        } catch (error) {
          console.error("Failed to submit form:", error);
        }
      }
    };

    void submit();
  }, [formValid, formState, dispatch, form.id]);

  return formSubmitted ? (
    <div className="umb-h-form">
      {form.name && <h4 className="umb-h-h4">{form.name}</h4>}
      {form.messageOnSubmit && form.messageOnSubmitIsHtml ? <div dangerouslySetInnerHTML={{ __html: form.messageOnSubmit }} /> : <p className="umb-h-messageOnSubmit">{form.messageOnSubmit}</p>}
    </div>
  ) : (
    <form className="umb-h-form" data-testid="umbraco-form" id={form.id} onSubmit={handleSubmit}>
      <div>
        <div className="umb-h-header">
          {form.name && <h4 className="umb-h-h4">{form.name}</h4>}
          {form.showValidationSummary && <ValidationSummary />}
        </div>
        {form.pages.map((page, idx) => (
          <Page currentPage={currentPage === idx} key={page.caption} page={page} />
        ))}
        <div className="umb-h-footer">
          <button className="umb-h-submit" type="submit">
            {form.submitLabel ?? "Submit"}
          </button>
          {form.pages.length > 1 && <PageSelector page={currentPage} setPage={setCurrentPage} />}
        </div>
      </div>
    </form>
  );
}
