"use server";

import { currentUser } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { cookies } from "next/headers";

const sql = neon(process.env.DATABASE_URL);

// Form Fetching
export async function fetchForms({ selectedOption }) {
  try {
    if (selectedOption === "me") {
      const user = await currentUser();
      return await sql`SELECT * FROM Forms
      WHERE created_by = ${user.id}
      ORDER BY created_at ASC`;
    }
    if (selectedOption === "templates") {
      return await sql`SELECT * FROM Templates ORDER BY created_at ASC`;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchFormById({ id, selectedOption }) {
  try {
    if (selectedOption === "me") {
      return await sql`SELECT * FROM Forms WHERE id = ${id}`;
    } else if (selectedOption === "templates") {
      return await sql`SELECT * FROM Templates WHERE id = ${id}`;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestions({ id, selectedOption }) {
  try {
    if (selectedOption === "me") {
      return await sql`SELECT questions 
      FROM questions 
      WHERE form_id = ${id}`;
    } else if (selectedOption === "templates") {
      return await sql`SELECT questions 
      FROM questions 
      WHERE template_id = ${id}`;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getResponses({ id }) {
  try {
    return await sql`SELECT form_data 
      FROM formsdata 
      WHERE form_identifier = ${id}`;
  } catch (error) {
    console.error(error);
  }
}

export async function getNumberOfResponses(
  responses: any[],
  formQuestions: any[],
  questionTitle: string
) {
  if (!Array.isArray(responses) || !Array.isArray(formQuestions)) return 0;

  const question = formQuestions.find(
    (q) => q.question_title === questionTitle
  );
  if (!question) return 0;

  const questionKey = question.order.toString();

  const attributeCounts = responses
    .flatMap((response) => {
      if (!response?.form_data) return [];

      return response.form_data
        .filter((item: any) => item.key === questionKey && item.value !== "")
        .map((item: any) => item.value);
    })
    .reduce(
      (counts, value) => {
        counts[value] = (counts[value] || 0) + 1;
        return counts;
      },
      {} as Record<string, number>
    );

  return attributeCounts;
}

export async function getIndividualResponses(
  responses: any[],
  formQuestions: any[],
  questionTitle: string
) {
  if (!Array.isArray(responses) || !Array.isArray(formQuestions)) return [];

  const question = formQuestions.find(
    (q) => q.question_title === questionTitle
  );
  if (!question) return [];

  const questionKey = question.order.toString();

  const items = responses.flatMap((response) => {
    if (!response?.form_data) return [];

    const attribute = response.form_data.find(
      (item) => item.key === questionKey
    );

    if (!attribute?.value) return [];

    return { ...attribute };
  });

  const groupedItems = items.reduce(
    (counts, item) => {
      counts[item.value] = (counts[item.value] || 0) + 1;
      return counts;
    },
    {} as Record<string, number>
  );

  return Object.entries(groupedItems).map(([value, count]) => ({
    value,
    count,
    questionTitle,
  }));
}

export async function processQuestions(formQuestions: any, responses: any) {
  return Promise.all(
    formQuestions.questions.map(async (question: any) => ({
      ...question,
      numberOfResponses: await getNumberOfResponses(
        responses,
        formQuestions.questions,
        question.question_title
      ),
      responses: await getIndividualResponses(
        responses,
        formQuestions.questions,
        question.question_title
      ),
    }))
  );
}

// Form Actions
export async function addFormData(prevState: any, formData: FormData) {
  const filteredData: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$ACTION")) continue;

    if (value instanceof File) {
      try {
        const blob = await put(value.name, value, {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        filteredData[key] = blob.url;
      } catch (error) {
        return { error: "Error subiendo archivo" };
      }
    } else {
      filteredData[key] = value;
    }
  }

  const formIdentifier = filteredData.identifier?.toString();
  if (!formIdentifier) return { error: "Identifier is required" };

  try {
    const { id } = await sql`
      INSERT INTO FormsData (form_identifier, form_data) 
      VALUES (${formIdentifier}, ${JSON.stringify(filteredData)})
      RETURNING id
    `.then((res) => res[0]);

    return id
      ? { success: true, formIdentifier }
      : { error: "Error adding data" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function updateFormData(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const selectedOption = cookieStore.get("selectedOption")?.value || "me";

  const filteredData = Object.fromEntries(
    Array.from(formData.entries()).filter(([key]) => !key.startsWith("$ACTION"))
  );
  const formIdKey = selectedOption === "me" ? "form_id" : "template_id";
  const formId = filteredData[formIdKey]?.toString();
  const title = filteredData.title?.toString();
  const description = filteredData.description?.toString();
  const topic = filteredData.topic?.toString();
  const questions = JSON.parse(filteredData.questions?.toString() || "[]");

  if (!formId) return { error: "Template ID is required." };

  try {
    if (selectedOption === "me") {
      await sql`
        UPDATE forms 
        SET title = ${title}, description = ${description}, topic = ${topic}, updated_at = NOW()
        WHERE id = ${formId}
      `;

      const existingQuestion = await sql`
        SELECT id FROM questions WHERE form_id = ${formId}
      `;

      if (existingQuestion.length > 0) {
        await sql`
          UPDATE questions
          SET questions = ${JSON.stringify(questions)}, updated_at = NOW()
          WHERE form_id = ${formId}
        `;
      } else {
        await sql`
          INSERT INTO questions (form_id, questions, created_at, updated_at)
          VALUES (${formId}, ${JSON.stringify(questions)}, NOW(), NOW())
        `;
      }
    } else if (selectedOption === "templates") {
      await sql`
        UPDATE templates 
        SET title = ${title}, description = ${description}, topic = ${topic}, updated_at = NOW()
        WHERE id = ${formId}
      `;

      const existingQuestion = await sql`
        SELECT id FROM questions WHERE template_id = ${formId}
      `;

      if (existingQuestion.length > 0) {
        await sql`
          UPDATE questions
          SET questions = ${JSON.stringify(questions)}, updated_at = NOW()
          WHERE template_id = ${formId}
        `;
      } else {
        await sql`
          INSERT INTO questions (template_id, questions, created_at, updated_at)
          VALUES (${formId}, ${JSON.stringify(questions)}, NOW(), NOW())
        `;
      }
    }

    return { success: true, formId };
  } catch (error) {
    throw new Error(error);
  }
}

export async function createForm(
  title: string,
  description: string,
  topic: string,
  questions: Question[]
) {
  try {
    const user = await currentUser();

    const formInsert = await sql`
      INSERT INTO forms (title, description, topic, created_by, created_at, updated_at)
      VALUES (${title}, ${description}, ${topic}, ${user.id}, NOW(), NOW())
      RETURNING id
    `;

    const formId = formInsert[0]?.id;
    if (!formId) throw new Error("Error creating form");

    if (questions.length > 0) {
      await sql`
        INSERT INTO questions (form_id, questions, created_at, updated_at)
        VALUES (${formId}, ${JSON.stringify(questions)}, NOW(), NOW())
      `;
    }

    return { success: true, formId };
  } catch (error) {
    console.error("Error creating form:", error);
    return { success: false, error };
  }
}

export async function removeForm(id, selectedOption) {
  try {
    if (selectedOption === "me") {
      await sql`DELETE FROM FormsData WHERE form_identifier = ${id}`;
      await sql`DELETE FROM Questions WHERE form_id = ${id}`;
      await sql`DELETE FROM Forms WHERE id = ${id}`;
    } else if (selectedOption === "templates") {
      await sql`DELETE FROM FormsData WHERE form_identifier = ${id}`;
      await sql`DELETE FROM Questions WHERE template_id = ${id}`;
      await sql`DELETE FROM Templates WHERE id = ${id}`;
    }
  } catch (error) {
    console.error("Error deleting form:", error);
  }
}
