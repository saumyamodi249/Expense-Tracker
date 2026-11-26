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

const defaultAppearance: AppearanceSettings = {
  theme: "light",
  accent: "charcoal",
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      account: {
        firstName: "Saumya",
        lastName: "Modi",
        fullName: "Saumya Modi",
        email: "saumyamodi2007@gmail.com",
        age: 21,
        dateOfBirth: "2003-05-15",
        currency: "USD ($)",
        timezone: "GMT+05:30",
        twoFactorEnabled: true,
      },

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

export default useProfileStore;
