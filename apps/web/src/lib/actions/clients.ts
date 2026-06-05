"use server";

import { db } from "@/lib/db";
import { clients, user, projectMilestones, invoices } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getClients() {
  try {
    const data = await db.select().from(clients).orderBy(desc(clients.createdAt));
    return { success: true, data };
  } catch (error: any) {
    console.error("Failed to fetch clients", error);
    return { success: false, error: error.message };
  }
}

export async function createClient(formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const companyName = formData.get("companyName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    const data = await db.insert(clients).values({
      userId,
      companyName,
      phoneNumber,
    }).returning();

    revalidatePath("/admin/clients");
    return { success: true, data: data[0] };
  } catch (error: any) {
    console.error("Failed to create client", error);
    return { success: false, error: error.message };
  }
}

export async function createInvoice(formData: FormData) {
  try {
    const clientId = formData.get("clientId") as string;
    const projectId = formData.get("projectId") as string || null;
    const invoiceNumber = `INV-${Date.now()}`;
    const amount = formData.get("amount") as string;
    const status = formData.get("status") as string;

    const data = await db.insert(invoices).values({
      clientId,
      projectId,
      invoiceNumber,
      amount,
      status,
    }).returning();

    revalidatePath("/admin/invoices");
    return { success: true, data: data[0] };
  } catch (error: any) {
    console.error("Failed to create invoice", error);
    return { success: false, error: error.message };
  }
}

export async function getInvoices() {
  try {
    const data = await db.select().from(invoices).orderBy(desc(invoices.createdAt));
    return { success: true, data };
  } catch (error: any) {
    console.error("Failed to fetch invoices", error);
    return { success: false, error: error.message };
  }
}
