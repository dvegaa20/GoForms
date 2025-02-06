import React from "react";
import {
  fetchFormById,
  getQuestions,
  getResponses,
} from "@/../lib/actions/actions";

export default async function ResponsesPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const form = await fetchFormById({ id });
  const responses = await getResponses({ id });
  const questions = await getQuestions({ id });

  console.log(questions[0].questions.length);

  return <div>ResponsesPage</div>;
}
