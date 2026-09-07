import { SvgSpinner } from '@/components/SvgSpinner';
import { Button } from '@base-ui/react';
import { useFormContext } from '@/hooks/forms/useAppForm';

interface SubmitButtonProps {
  children: React.ReactNode;
  isPending: boolean;
  isPendingText: string;
  className?: string;
  iconSize?: string;
  iconColor?: string;
  textClassName?: string;
}

export function SubmitButton({
  children,
  isPending,
  isPendingText,
  className = '',
  iconSize = 'h-4 w-4',
  iconColor = 'text-white',
  textClassName = '',
}: SubmitButtonProps) {
  const form = useFormContext();
  const pendingClass = isPending ? 'opacity-70 cursor-default' : 'cursor-pointer';
  return (
    <form.Subscribe>
      <Button
        type="submit"
        className={`${className} ${pendingClass}`}
        disabled={isPending}
        onClick={() => void form.handleSubmit()}
      >
        {isPending && <SvgSpinner color={iconColor} size={iconSize} />}
        <span className={textClassName}>{isPending ? isPendingText : children}</span>
      </Button>
    </form.Subscribe>
  );
}
