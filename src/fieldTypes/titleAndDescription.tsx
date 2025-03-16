import { FormFieldDto } from '../formsClient';

export default function TitleAndDescription({ field }: { field: FormFieldDto }) {
  return (
    <>
      <h1 className="text-3xl">{field.settings.caption}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: field.settings.bodyText ?? '',
        }}
      />
    </>
  );
}
