export type ProfileTab = "account" | "appearance" | "notifications";

export interface AccountSettings {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  age?: number | null;
  dateOfBirth?: string | null;
  currency: string;
  timezone: string;
  twoFactorEnabled: boolean;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accent: string;
}
