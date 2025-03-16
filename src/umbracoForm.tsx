import { FormsResource, OpenAPI } from "./formsClient";

import { FormStateProvider } from "./providers/formsStateProvider";

export default async function UmbracoForm({ formId, baseUrl, apiKey }: { formId: string; baseUrl: string; apiKey: string }) {
  OpenAPI.BASE = baseUrl;
  OpenAPI.HEADERS = {
    "Api-Key": apiKey,
  };

  try {
    const formData = await FormsResource.getUmbracoFormsDeliveryApiV1Definitions({
      id: formId,
    });
    console.log(OpenAPI.BASE);

    return <FormStateProvider form={formData} />;
  } catch (error) {
    console.error(error);
  }

  return <div>{formId}</div>;
}
