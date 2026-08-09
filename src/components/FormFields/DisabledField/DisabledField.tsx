import { Field } from '@base-ui/react';
interface DisabledFieldProps {
  label?: string;
  description?: string;
  value: string;
  className?: string;
}

export function DisabledField({ label = '', value = '', className = '' }: DisabledFieldProps) {
  return (
    <Field.Root className={`flex flex-col gap-1 ${className}`}>
      {label && <Field.Label className="font-semibold">{label}</Field.Label>}
      <Field.Control
        disabled
        value={value}
        className="rounded-md px-3 py-3 border border-slate-200 text-slate-400"
      />
    </Field.Root>
  );
}
