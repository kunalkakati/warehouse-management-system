import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/utils/auth";

// cached the session to avoid multiple calls to the auth.api.getSession() function
export const getSession = cache(async () =>
  auth.api.getSession({
    headers: await headers(),
  }),
);
