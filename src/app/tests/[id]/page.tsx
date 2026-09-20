import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TestClient from "./TestClient";

export const dynamic = 'force-dynamic';

export default async function TestPage({ params }: { params: { id: string } }) {
  const test = await prisma.test.findUnique({
    where: { id: params.id },
    include: {
      questions: true
    }
  });

  if (!test) {
    notFound();
  }

  // Ensure we don't pass Date objects directly to Client Components if we can help it, 
  // or serialize them properly.
  const serializedTest = {
    id: test.id,
    title: test.title,
    description: test.description,
    subject: test.subject,
    questions: test.questions.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options,
      correctIndex: q.correctIndex
    }))
  };

  return <TestClient test={serializedTest} />;
}
