import { MoneyField } from '@/components/FormFields/MoneyField';
import { TextField } from '@/components/FormFields/TextField';
import { SubmitButton } from '@/components/Buttons/SubmitButton';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    MoneyField,
    TextField,
  },
  formComponents: { SubmitButton },
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
