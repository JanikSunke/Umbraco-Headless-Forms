import { FormFieldDto } from '../formsClient';

import Checkbox from './checkbox';
import Date from './date';
import Dropdown from './dropdown';
import FileUpload from './fileUpload';
import LongAnswer from './longAnswer';
import MultipleChoice from './multipleChoice';
import Password from './password';
import RichText from './richText';
import ShortAnswer from './shortAnswer';
import TitleAndDescription from './titleAndDescription';

export const FieldComponents: Record<
  string,
  React.ComponentType<{
    field: FormFieldDto;
    multiple?: boolean;
  }>
> = {
  'Short answer': ShortAnswer,
  'Long answer': LongAnswer,
  Dropdown,
  'File upload': FileUpload,
  Checkbox,
  Date,
  'Multiple choice': (props) => <MultipleChoice {...props} multiple={true} />,
  'Single choice': (props) => <MultipleChoice {...props} multiple={false} />,
  Password,
  'Data Consent': Checkbox,
  'Title and description': TitleAndDescription,
  'Rich text': RichText,
};
