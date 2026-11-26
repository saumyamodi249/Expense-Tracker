import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AccountSettings,
  AppearanceSettings,
} from "../types/profiletypes";

interface ProfileStore {
  account: AccountSettings;
  appearance: AppearanceSettings;

  updateAccount: (data: Partial<AccountSettings>) => void;
  updateAppearance: (data: Partial<AppearanceSettings>) => void;
  resetAppearance: () => void;
}

const defaultAccount: AccountSettings = {
  firstName: "",
  lastName: "",
  fullName: "",
  email: "",
  age: null,
  dateOfBirth: null,
  currency: "USD ($)",
  timezone: "GMT+05:30",
  twoFactorEnabled: true,
};

const defaultAppearance: AppearanceSettings = {
  theme: "light",
  accent: "charcoal",
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      account: defaultAccount,

      appearance: defaultAppearance,

      updateAccount: (data) =>
        set((state) => {
          const updated = { ...state.account, ...data };
          if (data.firstName !== undefined || data.lastName !== undefined) {
            updated.fullName = `${updated.firstName || ''} ${updated.lastName || ''}`.trim();
          }
          return { account: updated };
        }),

      updateAppearance: (data) =>
        set((state) => ({
          appearance: { ...state.appearance, ...data },
        })),

      resetAppearance: () =>
        set(() => ({
          appearance: defaultAppearance,
        })),
    }),
    {
      name: "expense-tracker-profile-settings",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        account: state.account,
        appearance: state.appearance,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.account) {
          const rawAcc = state.account as unknown as Record<string, unknown>;
          if (rawAcc.fullName && !state.account.firstName) {
            const parts = String(rawAcc.fullName).trim().split(/\s+/);
            state.account.firstName = parts[0] || "";
            state.account.lastName = parts.slice(1).join(" ") || "";
          }
        }
        if (state?.appearance?.accent) {
          const raw = String(state.appearance.accent).toLowerCase();
          const validAccents = [
            "charcoal",
            "blue",
            "indigo",
            "purple",
            "rose",
            "crimson",
            "orange",
            "amber",
            "teal",
            "green",
          ];
          if (!validAccents.includes(raw)) {
            state.appearance.accent = "charcoal";
          }
        }
      },
    }
  )
);

export const syncProfileUser = (clerkUser: {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  email?: string | null;
}) => {
  useProfileStore.setState({
    account: defaultAccount,
    appearance: defaultAppearance,
  });
  useProfileStore.persist.setOptions({
    name: `expense-tracker-profile-settings-${clerkUser.id}`,
  });
  useProfileStore.persist.rehydrate();

  const current = useProfileStore.getState().account;
  const firstName = current.firstName || clerkUser.firstName || (clerkUser.fullName ? clerkUser.fullName.split(" ")[0] : "") || "";
  const lastName = current.lastName || clerkUser.lastName || (clerkUser.fullName ? clerkUser.fullName.split(" ").slice(1).join(" ") : "") || "";
  const email = current.email || clerkUser.email || "";

  useProfileStore.getState().updateAccount({ firstName, lastName, email });
};

export default useProfileStore;
