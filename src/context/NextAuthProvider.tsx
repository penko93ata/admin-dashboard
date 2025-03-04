"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session }>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
