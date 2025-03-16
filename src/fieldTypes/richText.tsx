import { FormFieldDto } from '../formsClient';

export default function RichText({ field }: { field: FormFieldDto }) {
  return (
    <div
      className="rte"
      dangerouslySetInnerHTML={{
        __html: field.settings.html ?? '',
      }}
    />
  );
}
