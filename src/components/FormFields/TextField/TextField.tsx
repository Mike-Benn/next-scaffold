import { useFieldContext } from '@/hooks/forms/useAppForm';
import { Field, Input } from '@base-ui/react';
import { useState } from 'react';

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  isDisabled?: boolean;
  isPassword?: boolean;
}

export function TextField({
  label = '',
  placeholder = '',
  maxLength,
  isDisabled = false,
  isPassword = false,
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Field.Root className="flex flex-col gap-1" disabled={isDisabled}>
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Input
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={() => {
          setIsFocused(false);
          field.handleBlur();
        }}
        onFocus={() => setIsFocused(true)}
        className={`border ${hasError ? 'border-red-500' : 'border-slate-400'} rounded-sm bg-slate-50 px-3 py-2 disabled:opacity-70 disabled:bg-gray-100 disabled:text-gray-50`}
        type={isPassword ? 'password' : 'text'}
        maxLength={maxLength}
      />
      {hasError && !isFocused && (
        <span className="text-red-500 text-sm">
          {typeof field.state.meta.errors[0] === 'string'
            ? field.state.meta.errors[0]
            : field.state.meta.errors[0]?.message}
        </span>
      )}
    </Field.Root>
  );
}
