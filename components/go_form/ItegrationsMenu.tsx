"use client";

import { useState } from "react";
import Image from "next/image";
import { IntegrationButton } from "@/../components/go_form/integrations/IntegrationButton";

export default function ExpandableMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

  const menuItems: IntegrationItem[] = [
    {
      icon: (
        <Image src="/salesforce.svg" alt="Salesforce" width={24} height={24} />
      ),
      action: "salesforce",
      text: "Salesforce Integration",
      fields: [
        { id: "salesforce-api-key", label: "API Key", type: "password" },
        { id: "salesforce-instance", label: "Instance URL", type: "text" },
      ],
    },
    {
      icon: <Image src="/odoo.svg" alt="Odoo" width={24} height={24} />,
      action: "odoo",
      text: "Odoo Integration",
      fields: [{ id: "odoo-url", label: "Odoo", type: "text" }],
    },
    {
      icon: <Image src="/jira.svg" alt="Jira" width={24} height={24} />,
      action: "jira",
      text: "Create a Jira Ticket",
      fields: [
        { id: "jira-ticket-summary", label: "Summary", type: "text" },
        {
          id: "jira-ticket-description",
          label: "Description",
          type: "text",
        },
        {
          id: "jira-ticket-issueType",
          label: "Issue Type",
          type: "select",
          options: [
            { value: "Task", label: "Task" },
            { value: "Epic", label: "Epic" },
            { value: "Story", label: "Story" },
            { value: "Bug", label: "Bug" },
          ],
        },
      ],
    },
  ];

  return (
    <div
      className="absolute bottom-6 right-10 p-2"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        if (openPopoverIndex === null) {
          setIsExpanded(false);
        }
      }}
    >
      <div className="flex items-center">
        {menuItems.map((item, index) => (
          <IntegrationButton
            key={index}
            item={item}
            index={index}
            isExpanded={isExpanded}
            menuLength={menuItems.length}
            openPopoverIndex={openPopoverIndex}
            setOpenPopoverIndex={setOpenPopoverIndex}
          />
        ))}
      </div>
    </div>
  );
}
