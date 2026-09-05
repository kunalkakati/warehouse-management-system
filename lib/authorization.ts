import { getSession } from "@/lib/auth-session";

type Role = "user" | "manager" | "admin";

export class AuthorizationError extends Error {
  constructor(message = "You are not authorized to perform this action.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export async function requireSession() {
  const session = await getSession();
  if (!session?.user) {
    throw new AuthorizationError("You must be signed in.");
  }
  return session;
}

export async function requireRole(roles: readonly Role[]) {
  const session = await requireSession();
  const role = session.user.role;

  // Server actions must check roles here because client-side menus are not security controls.
  if (!role || !roles.includes(role as Role)) {
    throw new AuthorizationError();
  }

  return session;
}

export function requireGodownAccess(
  session: Awaited<ReturnType<typeof requireSession>>,
  godownCode: string,
) {
  // Super admins can work across warehouses; every other user is limited to one godown.
  if (session.user.superAdmin) {
    return;
  }

  if (session.user.godownCode !== godownCode) {
    throw new AuthorizationError(
      "You can only access inventory assigned to your godown.",
    );
  }
}
