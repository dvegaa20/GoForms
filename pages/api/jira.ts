import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { summary, description, issuetype } = req.body;

  if (!summary || !description || !issuetype) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const JIRA_EMAIL = process.env.NEXT_PUBLIC_JIRA_EMAIL;
  const JIRA_API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN_JIRA;
  const JIRA_URL = process.env.NEXT_PUBLIC_JIRA_URL;

  if (!JIRA_EMAIL || !JIRA_API_TOKEN || !JIRA_URL) {
    return res.status(500).json({ error: "Faltan variables de entorno" });
  }

  const authHeader = `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`;

  const jiraPayload = {
    fields: {
      project: { key: "GOFORMS" },
      summary,
      description,
      issuetype: { name: issuetype },
    },
  };

  try {
    const response = await fetch(`${JIRA_URL}/rest/api/2/issue`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(jiraPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({ error: "Error en Jira", details: errorData });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error en la petición", details: error });
  }
}
