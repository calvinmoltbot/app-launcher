import { NextResponse } from "next/server";
import { getApps } from "@/lib/merge-apps";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const apps = await getApps();
    return NextResponse.json({ apps, count: apps.length });
  } catch (err) {
    console.error("[api/sync] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch apps" },
      { status: 500 }
    );
  }
}
