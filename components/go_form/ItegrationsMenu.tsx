"use client";

import { useState } from "react";
import { Button } from "@/../components/ui/button";
import Image from "next/image";

export default function ExpandableMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    {
      icon: (
        <Image src="/salesforce.svg" alt="Salesforce" width={24} height={24} />
      ),
      action: <div>cfdscfd</div>,
      text: "Salesforce Integration",
    },
    {
      icon: <Image src="/odoo.svg" alt="Odoo" width={24} height={24} />,
      action: <div>cdscdscds</div>,
      text: "Odoo Integration",
    },
    {
      icon: <Image src="/jira.svg" alt="Jira" width={24} height={24} />,
      action: <div>cdscdscds</div>,
      text: "Jira Integration",
    },
  ];

  return (
    <div
      className="absolute bottom-6 right-10 p-2"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setHoveredIndex(null);
      }}
    >
      <div className="flex items-center">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index && (
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1.5 rounded-md text-sm whitespace-nowrap
                          animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                {item.text}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
              </div>
            )}
            <Button
              variant="outline"
              className={`
                relative rounded-full w-12 h-12 p-0 overflow-hidden
                transition-all duration-500 ease-in-out shadow-xl
                hover:scale-110
                ${isExpanded ? "translate-x-3" : "-ml-6"}
              `}
              style={{
                transitionDelay: isExpanded ? `${index * 50}ms` : "0ms",
                zIndex: menuItems.length - index,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center rounded-full">
                <span className="font-semibold text-lg">{item.icon}</span>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
