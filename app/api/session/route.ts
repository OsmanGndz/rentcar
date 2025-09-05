import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 gün
  const sessionCookie = await getAuth().createSessionCookie(token, { expiresIn });

  (await cookies()).set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: expiresIn / 1000,
  });

  return new Response(JSON.stringify({ success: true }));
}

export async function DELETE() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (session) {
    try {
      const decoded = await getAuth().verifySessionCookie(session, true);
      await getAuth().revokeRefreshTokens(decoded.uid);
    } catch (e) {
      // ignore verification errors on logout
    }
  }

  cookieStore.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return new Response(JSON.stringify({ success: true }));
}
