export type AdminUser = {
  adminID: string;
  permissions: string[];
};

export type GuestUser = {
  guestToken: string;
  expiresAt: Date;
};

export function isAdmin(user: AdminUser | GuestUser): user is AdminUser {
  return user !== null && typeof user === 'object' && 'adminId' in user;
}

export function extractAdmins(
  users: Array<AdminUser | GuestUser>,
): AdminUser[] {
  return users.filter(isAdmin);
}
