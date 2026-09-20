"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendAdminNotification, sendApplicantConfirmation } from "@/lib/email";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  rollNumber: z.string().min(5, "Roll number is required"),
  year: z.string().min(1, "Year is required"),
  branch: z.string().min(1, "Branch/Department is required"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  interests: z.array(z.string()).min(1, "Select at least one area of interest"),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  reason: z.string().min(20, "Please provide a more detailed reason (at least 20 characters)"),
  honeypot: z.string().max(0, "Spam detected").optional()
});

import { headers } from "next/headers";

// Simple in-memory rate limiter for single-instance Docker deployment
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const MAX_SUBMISSIONS_PER_HOUR = 3;
const HOUR_IN_MS = 60 * 60 * 1000;

export async function submitApplication(prevState: any, formData: FormData) {
  try {
    // Spam protection / Rate limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown_ip";
    
    const now = Date.now();
    const userRecord = rateLimitMap.get(ip);
    
    if (userRecord) {
      if (now - userRecord.timestamp < HOUR_IN_MS) {
        if (userRecord.count >= MAX_SUBMISSIONS_PER_HOUR) {
          return {
            success: false,
            message: "You have reached the maximum number of submissions. Please try again later."
          };
        }
        userRecord.count++;
      } else {
        // Reset after an hour
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }
    
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      rollNumber: formData.get("rollNumber"),
      year: formData.get("year"),
      branch: formData.get("branch"),
      skills: formData.getAll("skills"),
      interests: formData.getAll("interests"),
      githubUrl: formData.get("githubUrl"),
      linkedinUrl: formData.get("linkedinUrl"),
      reason: formData.get("reason"),
      honeypot: formData.get("honeypot")
    };

    const validatedData = applicationSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Please correct the errors in the form."
      };
    }

    if (validatedData.data.honeypot) {
      return { success: false, message: "Spam detected." };
    }

    // Check for duplicates
    const existingUser = await prisma.application.findFirst({
      where: {
        OR: [
          { email: validatedData.data.email },
          { rollNumber: validatedData.data.rollNumber }
        ]
      }
    });

    if (existingUser) {
      return {
        success: false,
        message: "An application with this email or roll number already exists."
      };
    }

    // Save to DB
    const { honeypot, ...dbData } = validatedData.data;
    
    await prisma.application.create({
      data: {
        ...dbData,
        githubUrl: dbData.githubUrl || null,
        linkedinUrl: dbData.linkedinUrl || null,
      }
    });

    // Send email notifications (fire-and-forget — won't block the response)
    console.log("[Application] Sending email notifications in background...");
    Promise.all([
      sendAdminNotification(dbData),
      sendApplicantConfirmation(dbData.fullName, dbData.email),
    ]).then(() => {
      console.log("[Application] Emails sent successfully!");
    }).catch((emailError) => {
      console.error("[Application] Email notification FAILED:", emailError.message || emailError);
    });

    return {
      success: true,
      message: "Application submitted successfully! Check your email for confirmation."
    };

  } catch (error) {
    console.error("Application submission error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later."
    };
  }
}
