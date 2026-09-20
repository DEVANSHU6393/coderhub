"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getResources() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: resources };
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return { success: false, message: "Failed to fetch resources" };
  }
}

export async function createResource(data: {
  title: string;
  category: string;
  subject: string;
  link: string;
}) {
  try {
    await prisma.resource.create({
      data,
    });
    revalidatePath("/resources");
    revalidatePath("/admin/resources");
    return { success: true, message: "Resource created successfully" };
  } catch (error) {
    console.error("Failed to create resource:", error);
    return { success: false, message: "Failed to create resource" };
  }
}

export async function deleteResource(id: string) {
  try {
    await prisma.resource.delete({
      where: { id },
    });
    revalidatePath("/resources");
    revalidatePath("/admin/resources");
    return { success: true, message: "Resource deleted successfully" };
  } catch (error) {
    console.error("Failed to delete resource:", error);
    return { success: false, message: "Failed to delete resource" };
  }
}
