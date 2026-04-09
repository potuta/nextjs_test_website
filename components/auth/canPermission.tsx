import React from "react";

type User = {
  permissions: string[];
};

type CanProps = {
  permission: string;
  user?: User | null; // optional in case user is not loaded yet
  children: React.ReactNode;
};

export function Can({ permission, user, children }: CanProps) {
  if (!user) return null;

  const hasAccess = user.permissions.includes(permission);
  return hasAccess ? <>{children}</> : null;
}