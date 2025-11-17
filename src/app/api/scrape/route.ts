import { NextResponse } from "next/server";
import { scrapeAmazonListings } from "@/lib/amazon";
import { AMAZON_FLAGPOLE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await scrapeAmazonListings(AMAZON_FLAGPOLE_URL);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Onbekende fout" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json().catch(() => ({ url: undefined }));
    const data = await scrapeAmazonListings(
      typeof url === "string" && url.length > 0 ? url : AMAZON_FLAGPOLE_URL
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Onbekende fout" },
      { status: 500 }
    );
  }
}


