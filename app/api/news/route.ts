
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "NEWS_API_KEY topilmadi. .env.local faylini tekshiring." },
      { status: 500 }
    );
  }

  try {
    const url = new URL("https://newsapi.org/v2/top-headlines");
    url.searchParams.set("country", "us");
    url.searchParams.set("pageSize", "20");

    const response = await fetch(url.toString(), {
      headers: {
        "X-Api-Key": apiKey,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "NewsAPI so‘rovi bajarilmadi." },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Yangiliklarni olishda xatolik yuz berdi." },
      { status: 500 }
    );
  }
}