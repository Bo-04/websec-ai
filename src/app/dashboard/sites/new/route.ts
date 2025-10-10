// @ts-nocheck
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const form = await req.formData();
  const name = String(form.get("name") || "").trim();
  const url  = String(form.get("url")  || "").trim();
  if (!name || !url) {
    return NextResponse.redirect(new URL("/dashboard/sites", req.url));
  }

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.redirect(new URL("/dashboard/sites", req.url));
  }

  const token = crypto.randomBytes(24).toString("hex");

  await db.site.create({
    data: { userId: user.id, name, url, token },
  });

  return NextResponse.redirect(new URL("/dashboard/sites", req.url));
}
