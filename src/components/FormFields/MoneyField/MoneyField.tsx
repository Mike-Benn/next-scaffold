import { useFieldContext } from '@/hooks/forms/useAppForm';
import { Field, Input } from '@base-ui/react';
import { CircleAlert } from 'lucide-react';

interface MoneyFieldProps {
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
}

export function MoneyField({ label = '', placeholder = '', isDisabled = false }: MoneyFieldProps) {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;

  return (
    <Field.Root className="flex flex-col gap-2" disabled={isDisabled}>
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Input
        placeholder={placeholder}
        value={field.state.value}
        className={`border rounded-sm bg-slate-50 px-3 py-2 outline-none focus:ring-1 disabled:opacity-70 disabled:bg-gray-100 disabled:text-gray-50 ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-slate-400 focus:border-indigo-600 focus:ring-indigo-600'}`}
        onChange={(e) => {
          const val = e.target.value;
          if (/[^0-9.]/.test(val)) return;
          if ((val.match(/\./g) || []).length > 1) return;
          if (/\.\d{3,}/.test(val)) return;
          field.handleChange(val);
        }}
        onBlur={() => {
          const num = parseFloat(field.state.value);
          if (!isNaN(num)) field.handleChange(num.toFixed(2));
          field.handleBlur();
        }}
      />
      {hasError && (
        <div className="flex items-center gap-1">
          <CircleAlert color="red" size={16} className="shrink-0" />
          <span className="text-red-500 text-sm">
            {typeof field.state.meta.errors[0] === 'string'
              ? field.state.meta.errors[0]
              : field.state.meta.errors[0]?.message}
          </span>
        </div>
      )}
    </Field.Root>
  );
}
