"use server";

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// User and User Data Fetching

export async function postUserData({ id, firstName, lastName, email }) {
  try {
    return await sql`
    INSERT INTO Users (id, first_name, last_name, email) 
    VALUES (${id}, ${firstName}, ${lastName}, ${email}) 
    ON CONFLICT (id) DO NOTHING
    `;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUsers() {
  try {
    const users = await sql`SELECT * FROM Users`;
    return users;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUserStatus({ id }) {
  try {
    return await sql`SELECT status FROM Users WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUserAdminStatus({ id }) {
  try {
    return await sql`SELECT admin FROM Users WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
  }
}

export async function toggleBlockUser(id) {
  try {
    return await sql`
      UPDATE users 
      SET status = CASE 
        WHEN status = 'active' THEN 'blocked' 
        ELSE 'active' 
      END 
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
  }
}

export async function toggleAdminUser(id) {
  try {
    return await sql`UPDATE users SET admin = NOT admin WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
  }
}

export async function removeUser(id) {
  try {
    return await sql`DELETE FROM Users WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
  }
}

// Form Fetching

export async function fetchAllForms() {
  try {
    return await sql`SELECT * FROM Templates`;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchFormById({ id }) {
  try {
    return await sql`SELECT * FROM Templates WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllFormsData({ id }) {
  try {
    return await sql`SELECT t.title, q.questions, f.responses
    FROM templates t
    JOIN questions q ON t.id = q.template_id
    JOIN forms f ON t.id = f.template_id
    WHERE t.id = ${id}`;
  } catch (error) {
    console.error(error);
  }
}

export async function getQuestions({ id }) {
  try {
    return await sql`SELECT questions 
    FROM questions 
    WHERE template_id = ${id}`;
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

export async function getIndividualResponses({ id }) {
  try {
  } catch (error) {
    console.error(error);
  }
}

// Form Actions
export async function addFormData(prevState: any, formData: FormData) {
  console.log(formData);

  const rawFormData = Object.entries(Object.fromEntries(formData))
    .filter(([key, value]) => !key.startsWith("$ACTION"))
    .map(([key, value]) => ({ key, value }));

  const formIdentifier = rawFormData
    .find((data) => data.key === "identifier")
    ?.value.toString();

  const formDataToSubmit = rawFormData.filter(
    (data) => data.key !== "identifier"
  );

  if (!formIdentifier) return;

  let error: ErrorResponse | null = null;
  let formDataEntity: any = null;

  try {
    formDataEntity = await sql`
      INSERT INTO FormsData (form_identifier, form_data) 
      VALUES (${formIdentifier}, ${JSON.stringify(formDataToSubmit)}) 
      RETURNING id
    `;

    if (!formDataEntity.length || !formDataEntity[0].id) {
      error = {
        statusCode: 500,
        message: "Error adding data to the form.",
      };
      return { error: error.message };
    }

    return { success: true, formIdentifier };
  } catch (error) {
    return { error: error.message };
  }
}
