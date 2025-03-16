import { FormsResource, OpenAPI } from './formsClient';

import { FormStateProvider } from './providers/formsStateProvider';

OpenAPI.BASE = process.env.NEXT_PUBLIC_UMBRACO_URL ?? '';
OpenAPI.HEADERS = {
  'Api-Key': process.env.NEXT_PUBLIC_UMBRACO_API_KEY ?? '',
};

export default async function UmbracoForm({ formId }: { formId: string }) {
  try {
    const formData = await FormsResource.getUmbracoFormsDeliveryApiV1Definitions({
      id: formId,
    });

    return <FormStateProvider form={formData} />;
  } catch (error) {
    console.error(error);
  }

  return <div>{formId}</div>;
}
