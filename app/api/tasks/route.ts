import { NextResponse } from "next/server";
import { getTasks } from "@/app/demo/table/actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const sort = searchParams.get("sort") || undefined;
  const title = searchParams.get("title") || undefined;
  const status = searchParams.get("status") || undefined;
  const priority = searchParams.get("priority") || undefined;

  try {
    const result = await getTasks({
      page,
      pageSize,
      sort,
      title,
      status,
      priority,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
