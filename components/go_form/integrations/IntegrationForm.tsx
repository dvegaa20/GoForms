import type React from "react";
import { Button } from "@/../components/ui/button";
import { Input } from "@/../components/ui/input";
import { Label } from "@/../components/ui/label";

export function IntegrationForm({
  item,
  onSubmit,
  isSubmitting,
}: IntegrationFormProps) {
  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-8 w-8 rounded-full overflow-hidden">{item.icon}</div>
        <h3 className="font-medium">{item.text}</h3>
      </div>
      <form onSubmit={onSubmit} method="POST">
        <div className="grid gap-4">
          {item.fields.map((field) => (
            <div key={field.id} className="grid gap-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              {field.type === "select" ? (
                <select
                  id={field.id}
                  name={field.id}
                  required
                  className="border border-gray-300 rounded-md px-3 py-2"
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  required
                  placeholder={`Enter ${field.label.toLowerCase()} for the ticket`}
                />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : `${item.text.split(" ")[0]}`}
          </Button>
        </div>
      </form>
    </>
  );
}
