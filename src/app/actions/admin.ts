"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// Applications
export async function updateApplicationStatus(id: string, status: string) {
  try {
    await prisma.application.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, message: "Failed to update status" };
  }
}

// Events
export async function createEvent(prevState: any, formData: FormData) {
  try {
    await prisma.event.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        date: formData.get("date") as string,
        time: formData.get("time") as string,
        venue: formData.get("venue") as string,
        imageUrl: (formData.get("imageUrl") as string) || null,
        registrationLink: (formData.get("registrationLink") as string) || null,
      }
    });
    
    revalidatePath("/admin/events");
    revalidatePath("/events");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, message: "Failed to create event" };
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({
      where: { id }
    });
    
    revalidatePath("/admin/events");
    revalidatePath("/events");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, message: "Failed to delete event" };
  }
}
