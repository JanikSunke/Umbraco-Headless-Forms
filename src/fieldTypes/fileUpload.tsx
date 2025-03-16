import { useEffect, useRef } from 'react';

import { FormFieldDto } from '../formsClient';
import {
  UndefinedIfEmpty,
  UndefinedIfEmptyNumber,
} from '../helpers/stringHelpers';
import { useFormState } from '../providers/formsStateProvider';

export default function FileUpload({ field }: { field: FormFieldDto }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    state: { formState },
    dispatch,
  } = useFormState();
  const defaultValue = formState.fields[field.id]?.files ?? [];

  useEffect(() => {
    dispatch({ type: 'registerField', value: 'file', field, files: defaultValue });

    // Cleanup function to handle unmounting (when field becomes invisible)
    return () => {
      dispatch({ type: 'unregisterField', field });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;

    if (!inputFiles) return;

    const fileReadPromises = Array.from(inputFiles).map((file: File) => {
      return new Promise<{ fileName: string; fileContent: string }>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (!reader.result) {
            reject(new Error('Failed to read file'));

            return;
          }

          const fileContent =
            typeof reader.result === 'string'
              ? reader.result
              : Buffer.from(reader.result).toString('base64');

          resolve({
            fileName: file.name,
            fileContent,
          });
        };

        reader.onerror = (error) => {
          reject(new Error(error instanceof Error ? error.message : String(error.type)));
        };

        reader.readAsDataURL(file);
      });
    });

    try {
      const files = await Promise.all(fileReadPromises);

      dispatch({
        type: 'validateUpdateField',
        value: 'file',
        field,
        files,
      });
    } catch (error) {
      console.error(
        'Error processing files:',
        error instanceof Error ? error.message : String(error),
      );
    }
  };

  return (
    <label
      className="flex justify-between p-2 w-full bg-white rounded-sm border shadow-none outline-none border-info"
      htmlFor={field.id}
    >
      <input
        accept={
          field.fileUploadOptions?.allowAllUploadExtensions
            ? undefined
            : `.${field.fileUploadOptions?.allowedUploadExtensions.join(',.')}`
        }
        autoComplete={field.settings.autocomplete ?? undefined}
        className="sr-only"
        id={field.id}
        max={UndefinedIfEmptyNumber(field.settings.maxLength)}
        name={field.alias}
        onChange={onChange}
        placeholder={UndefinedIfEmpty(field.settings.placeholder)}
        ref={inputRef}
        type="file"
      />
      <span>
        {defaultValue.length > 0
          ? defaultValue.map((f) => f.fileName).join(', ')
          : field.requiredErrorMessage}
      </span>
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M12 18v-6" />
        <path d="m9 15 3 3 3-3" />
      </svg>
    </label>
  );
}
