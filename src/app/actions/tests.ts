"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTests() {
  try {
    const tests = await prisma.test.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });
    return { success: true, data: tests };
  } catch (error) {
    console.error("Failed to fetch tests:", error);
    return { success: false, message: "Failed to fetch tests" };
  }
}

export async function getTestWithQuestions(id: string) {
  try {
    const test = await prisma.test.findUnique({
      where: { id },
      include: {
        questions: true
      }
    });
    return { success: true, data: test };
  } catch (error) {
    console.error("Failed to fetch test details:", error);
    return { success: false, message: "Failed to fetch test details" };
  }
}

export async function createTest(data: {
  title: string;
  description: string;
  subject: string;
}) {
  try {
    const test = await prisma.test.create({ data });
    revalidatePath("/tests");
    revalidatePath("/admin/tests");
    return { success: true, data: test, message: "Test created successfully" };
  } catch (error) {
    console.error("Failed to create test:", error);
    return { success: false, message: "Failed to create test" };
  }
}

export async function deleteTest(id: string) {
  try {
    await prisma.test.delete({ where: { id } });
    revalidatePath("/tests");
    revalidatePath("/admin/tests");
    return { success: true, message: "Test deleted successfully" };
  } catch (error) {
    console.error("Failed to delete test:", error);
    return { success: false, message: "Failed to delete test" };
  }
}

export async function addQuestion(testId: string, data: {
  text: string;
  options: string[];
  correctIndex: number;
}) {
  try {
    await prisma.question.create({
      data: {
        testId,
        text: data.text,
        options: data.options,
        correctIndex: data.correctIndex
      }
    });
    revalidatePath(`/admin/tests/${testId}`);
    revalidatePath(`/tests/${testId}`);
    return { success: true, message: "Question added successfully" };
  } catch (error) {
    console.error("Failed to add question:", error);
    return { success: false, message: "Failed to add question" };
  }
}

export async function deleteQuestion(id: string, testId: string) {
  try {
    await prisma.question.delete({ where: { id } });
    revalidatePath(`/admin/tests/${testId}`);
    revalidatePath(`/tests/${testId}`);
    return { success: true, message: "Question deleted successfully" };
  } catch (error) {
    console.error("Failed to delete question:", error);
    return { success: false, message: "Failed to delete question" };
  }
}
