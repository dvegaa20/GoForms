"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/../components/ui/popover";
import { IntegrationForm } from "./IntegrationForm";
import { SuccessMessage } from "./SuccessMessage";

export function IntegrationButton({
  item,
  index,
  isExpanded,
  menuLength,
  openPopoverIndex,
  setOpenPopoverIndex,
}: IntegrationButtonProps) {
  const [hoveredIndex, setHoveredIndex] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      if (item.action === "salesforce") {
      } else if (item.action === "jira") {
        const response = await fetch("/api/jira", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            summary: data["jira-ticket-summary"],
            description: data["jira-ticket-description"],
            issuetype: data["jira-ticket-issueType"],
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            setOpenPopoverIndex(null);
          }, 2000);
        } else {
          console.error("Error en la API:", result);
        }
      } else {
        throw new Error("Integración no soportada");
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHoveredIndex(true)}
      onMouseLeave={() => setHoveredIndex(false)}
    >
      {hoveredIndex && openPopoverIndex !== index && (
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1.5 rounded-md text-sm whitespace-nowrap
                    animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {item.text}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
        </div>
      )}
      <Popover
        open={openPopoverIndex === index}
        onOpenChange={(open) => {
          if (open) {
            setOpenPopoverIndex(index);
          } else if (openPopoverIndex === index) {
            setOpenPopoverIndex(null);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="default"
            className={`
              relative rounded-full w-12 h-12 p-0 overflow-hidden
              transition-all duration-500 ease-in-out shadow-xl
              hover:scale-110
              ${isExpanded ? "translate-x-3" : "-ml-6"}
              ${openPopoverIndex === index ? "ring-2 ring-primary" : ""}
            `}
            style={{
              transitionDelay: isExpanded ? `${index * 50}ms` : "0ms",
              zIndex: menuLength - index,
            }}
            onClick={() => {
              if (openPopoverIndex === index) {
                setOpenPopoverIndex(null);
              } else {
                setOpenPopoverIndex(index);
              }
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center rounded-full">
              <span className="font-semibold text-lg">{item.icon}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80"
          align="end"
          alignOffset={-20}
          sideOffset={16}
        >
          {isSuccess ? (
            <SuccessMessage text={item.text} />
          ) : (
            <IntegrationForm
              item={item}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
