"use server";

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// User Fetching

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
    return await sql`SELECT questions FROM questions WHERE template_id = ${id}`;
  } catch (error) {
    console.error(error);
  }
}

export async function getRespones({ id }) {
  try {
    return await sql`SELECT f.id, f.user_id, f.responses, f.submitted_at, t.title, t.description
FROM forms f
JOIN templates t ON f.template_id = t.id
WHERE f.template_id = ${id}
ORDER BY f.submitted_at DESC`;
  } catch (error) {
    console.error(error);
  }
}

// User Data Fetching
