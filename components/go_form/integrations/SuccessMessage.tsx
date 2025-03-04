import { Check } from "lucide-react";

interface SuccessMessageProps {
  text: string;
}

export function SuccessMessage({ text }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
        <Check className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="font-medium text-lg">{text} Successful!</h3>
      <p className="text-sm text-muted-foreground mt-1">
        This action was completed successfully.
      </p>
    </div>
  );
}
