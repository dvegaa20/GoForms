"use server";

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

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

export async function fetchUserStatus({
  id,
  email,
}: {
  id?: string;
  email?: string;
}) {
  try {
    if (id) {
      return await sql`SELECT status FROM Users WHERE id = ${id}`;
    } else if (email) {
      return await sql`SELECT status FROM Users WHERE email = ${email}`;
    }
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
