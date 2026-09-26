import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();

  return Response.json({
    message: "Database connected",
  });
}
