export interface FormState {
  fields: Record<string, FieldState>;
}

export interface FieldState {
  name: string;
  value?: FieldValue;
  files?: FileValue[];
  required: boolean;
  valid: boolean;
}

export type FieldValue = string | string[];

export interface FileValue {
  fileName: string;
  fileContent: string;
}
