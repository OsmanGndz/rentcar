import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 gün
  const sessionCookie = await getAuth().createSessionCookie(token, { expiresIn });

  (await cookies()).set("session", sessionCookie, {
    httpOnly: true,
    secure: true,
    maxAge: expiresIn / 1000,
  });

  return new Response(JSON.stringify({ success: true }));
}
