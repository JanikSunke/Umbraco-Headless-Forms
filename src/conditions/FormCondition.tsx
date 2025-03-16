import { useEffect, useState } from 'react';
import {
  FieldConditionActionType,
  FieldConditionLogicType,
  FieldConditionRuleOperator,
  FormConditionDto,
  FormConditionRuleDto,
} from '../formsClient';
import { useFormState } from '../providers/formsStateProvider';
import { FieldState, FieldValue, FormState } from '../types/formStateTypes';

const operatorFunctionMap = {
  [FieldConditionRuleOperator.CONTAINS]: (input: string) => (value: FieldValue) =>
    value.toString().includes(input),
  [FieldConditionRuleOperator.ENDS_WITH]: (input: string) => (value: FieldValue) => {
    if (Array.isArray(value)) return value.some((x) => x.endsWith(input));

    return value.toString().endsWith(input);
  },
  [FieldConditionRuleOperator.IS]: (input: string) => (value: FieldValue) =>
    input === value.toString(),
  [FieldConditionRuleOperator.IS_NOT]: (input: string) => (value: FieldValue) =>
    input !== value.toString(),
  [FieldConditionRuleOperator.GREATER_THEN]: (input: string) => (value: FieldValue) =>
    input > value.toString(),
  [FieldConditionRuleOperator.LESS_THEN]: (input: string) => (value: FieldValue) =>
    input < value.toString(),
  [FieldConditionRuleOperator.STARTS_WITH]: (input: string) => (value: FieldValue) => {
    if (Array.isArray(value)) return value.some((x) => x.startsWith(input));

    return value.toString().startsWith(input);
  },
  [FieldConditionRuleOperator.CONTAINS_IGNORE_CASE]: (input: string) => (value: FieldValue) => {
    const lowerInput = input.toLowerCase();

    if (Array.isArray(value)) {
      return value.some((x) => x.toLowerCase().includes(lowerInput));
    }

    return value.toString().toLowerCase().includes(lowerInput);
  },
  [FieldConditionRuleOperator.STARTS_WITH_IGNORE_CASE]: (input: string) => (value: FieldValue) => {
    const lowerInput = input.toLowerCase();

    if (Array.isArray(value)) {
      return value.some((x) => x.toLowerCase().startsWith(lowerInput));
    }

    return value.toString().toLowerCase().startsWith(lowerInput);
  },
  [FieldConditionRuleOperator.ENDS_WITH_IGNORE_CASE]: (input: string) => (value: FieldValue) => {
    const lowerInput = input.toLowerCase();

    if (Array.isArray(value)) {
      return value.some((x) => x.toLowerCase().endsWith(lowerInput));
    }

    return value.toString().toLowerCase().endsWith(lowerInput);
  },
  [FieldConditionRuleOperator.NOT_CONTAINS]: (input: string) => (value: FieldValue) => {
    if (Array.isArray(value)) {
      return !value.some((x) => x.includes(input));
    }

    return !value.toString().includes(input);
  },
  [FieldConditionRuleOperator.NOT_CONTAINS_IGNORE_CASE]: (input: string) => (value: FieldValue) => {
    const lowerInput = input.toLowerCase();

    if (Array.isArray(value)) {
      return !value.some((x) => x.toLowerCase().includes(lowerInput));
    }

    return !value.toString().toLowerCase().includes(lowerInput);
  },
  [FieldConditionRuleOperator.NOT_STARTS_WITH]: (input: string) => (value: FieldValue) => {
    if (Array.isArray(value)) {
      return !value.some((x) => x.startsWith(input));
    }

    return !value.toString().startsWith(input);
  },
  [FieldConditionRuleOperator.NOT_STARTS_WITH_IGNORE_CASE]:
    (input: string) => (value: FieldValue) => {
      const lowerInput = input.toLowerCase();

      if (Array.isArray(value)) {
        return !value.some((x) => x.toLowerCase().startsWith(lowerInput));
      }

      return !value.toString().toLowerCase().startsWith(lowerInput);
    },
  [FieldConditionRuleOperator.NOT_ENDS_WITH]: (input: string) => (value: FieldValue) => {
    if (Array.isArray(value)) {
      return !value.some((x) => x.endsWith(input));
    }

    return !value.toString().endsWith(input);
  },
  [FieldConditionRuleOperator.NOT_ENDS_WITH_IGNORE_CASE]:
    (input: string) => (value: FieldValue) => {
      const lowerInput = input.toLowerCase();

      if (Array.isArray(value)) {
        return !value.some((x) => x.toLowerCase().endsWith(lowerInput));
      }

      return !value.toString().toLowerCase().endsWith(lowerInput);
    },
};

const checkValueAgainstOperator = (
  data: Record<string, FieldState>,
  rule: FormConditionRuleDto,
) => {
  const field = data[rule.field];

  if (!field?.value) return false;

  return operatorFunctionMap[rule.operator](rule.value)(field.value);
};

const logicMap = {
  [FieldConditionLogicType.ALL]: (
    rules: FormConditionRuleDto[],
    data: Record<string, FieldState>,
  ) =>
    rules.every((rule) => {
      return checkValueAgainstOperator(data, rule);
    }),
  [FieldConditionLogicType.ANY]: (
    rules: FormConditionRuleDto[],
    data: Record<string, FieldState>,
  ) =>
    rules.some((rule) => {
      return checkValueAgainstOperator(data, rule);
    }),
};

const ShowHide = (formState: FormState, condition?: FormConditionDto) => {
  if (!condition) return true;

  const show = logicMap[condition.logicType](condition.rules, formState.fields);

  if (condition.actionType === FieldConditionActionType.HIDE) {
    return !show;
  }

  return show;
};

export default function FormCondition({
  condition,
  children,
  className,
}: {
  condition?: FormConditionDto;
  children: React.ReactNode;
  className?: string;
}) {
  const {
    state: { formState },
  } = useFormState();

  const [result, setResult] = useState(ShowHide(formState, condition));

  useEffect(() => {
    if (!condition) return;

    setResult(ShowHide(formState, condition));
  }, [formState, condition]);

  return result && <div className={className}>{children}</div>;
}
