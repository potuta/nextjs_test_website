import React from "react";
import { User } from "../types/userSession";

type CanProps = {
  user: User | null;
  role?: string;
  permission?: string;
  children: React.ReactNode;
};

export function Can({ user, role, permission, children }: Readonly<CanProps>) {
  if (!user) return null;

  if (role && user.role !== role) {
    return null;
  }

  if (permission && !user.permissions?.includes(permission)) {
    return null;
  }

  return <>{children}</>;
}