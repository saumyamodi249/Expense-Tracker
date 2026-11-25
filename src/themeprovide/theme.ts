// src/themeprovide/theme.ts
export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "hexacoder-theme";
export const THEME_CHANGE_EVENT = "hexacoder-theme-change";
export const ACCENT_STORAGE_KEY = "hexacoder-accent";
export const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

export const DEFAULT_ACCENT = "charcoal";

export interface AccentColorOption {
  name: string;
  id: string;
}

export const ACCENT_PALETTE: AccentColorOption[] = [
  { name: "Charcoal", id: "charcoal" },
  { name: "Blue", id: "blue" },
  { name: "Indigo", id: "indigo" },
  { name: "Purple", id: "purple" },
  { name: "Rose", id: "rose" },
  { name: "Crimson", id: "crimson" },
  { name: "Orange", id: "orange" },
  { name: "Amber", id: "amber" },
  { name: "Teal", id: "teal" },
  { name: "Green", id: "green" },
];

export function getAntdThemeConfig(_isDark?: boolean, _accent?: string) {
  return {
    token: {
      colorPrimary: "var(--theme-color-primary)",
      colorTextBase: "var(--theme-color-font)",
      colorText: "var(--theme-color-font)",
      colorTextSecondary: "var(--theme-color-font-secondary)",
      colorTextTertiary: "var(--theme-color-font-tertiary)",
      colorBgBase: "var(--theme-color-background)",
      colorBgLayout: "var(--theme-color-background)",
      colorBgContainer: "var(--theme-color-sidebar)",
      colorBgElevated: "var(--theme-color-modal-bg)",
      colorBorder: "var(--theme-color-border)",
      colorBorderSecondary: "var(--theme-color-border-secondary)",
      borderRadius: 16,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    components: {
      Modal: {
        contentBg: "var(--theme-color-modal-bg)",
        headerBg: "var(--theme-color-modal-bg)",
        titleColor: "var(--theme-color-font)",
        borderRadiusLG: 20,
      },
      Input: {
        colorBgContainer: "var(--theme-color-modal-input)",
        colorText: "var(--theme-color-font)",
        colorBorder: "var(--theme-color-border)",
        activeBorderColor: "var(--theme-color-primary)",
        hoverBorderColor: "var(--theme-color-primary)",
        activeShadow: "none",
      },
      InputNumber: {
        colorBgContainer: "var(--theme-color-modal-input)",
        colorText: "var(--theme-color-font)",
        colorBorder: "var(--theme-color-border)",
        activeBorderColor: "var(--theme-color-primary)",
        hoverBorderColor: "var(--theme-color-primary)",
        activeShadow: "none",
      },
      Segmented: {
        itemSelectedBg: "var(--theme-color-primary)",
        itemSelectedColor: "var(--theme-color-on-brand)",
      },
      Divider: {
        marginLG: 0,
        colorSplit: "var(--theme-color-border)",
      },
      Select: {
        colorBgContainer: "var(--theme-color-modal-input)",
        colorText: "var(--theme-color-font)",
        colorBorder: "var(--theme-color-border)",
        activeBorderColor: "var(--theme-color-primary)",
        hoverBorderColor: "var(--theme-color-primary)",
        optionSelectedBg: "var(--theme-color-primary)",
        optionSelectedColor: "var(--theme-color-on-brand)",
        optionActiveBg: "var(--theme-color-background-secondary)",
        colorBgElevated: "var(--theme-color-modal-bg)",
        controlHeight: 42,
        borderRadius: 12,
      },
      Tabs: {
        itemColor: "var(--theme-color-font-secondary)",
        itemSelectedColor: "var(--theme-color-font)",
        itemHoverColor: "var(--theme-color-primary)",
        itemActiveColor: "var(--theme-color-primary)",
        inkBarColor: "var(--theme-color-primary)",
        titleFontSize: 15,
      },
    },
  };
}

function normalizeThemePreference(
  value: string | null | undefined,
): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

/** Reads the saved preference, falling back to the system theme. */
export function readStoredThemePreference(): ThemePreference {
  try {
    return normalizeThemePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "system";
  }
}

/** Returns the current preference from the document. Used only in the browser. */
export function getThemePreference(): ThemePreference {
  return normalizeThemePreference(document.documentElement.dataset.theme);
}

/** Applies the accent color as dataset across the entire application */
export function applyAccentColor(accentId: string): void {
  if (typeof document === "undefined" || !accentId) return;
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
  const id = validAccents.includes(accentId) ? accentId : DEFAULT_ACCENT;
  document.documentElement.dataset.accent = id;

  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, id);
  } catch {}
}

/** Applies the preference, resolving system mode to the current device setting. */
export function applyThemePreference(preference: ThemePreference): void {
  const root = document.documentElement;
  const isDark =
    preference === "dark" ||
    (preference === "system" && window.matchMedia(SYSTEM_THEME_QUERY).matches);

  root.dataset.theme = preference;
  root.dataset.colorScheme = isDark ? "dark" : "light";
  root.classList.toggle("scheme-dark", isDark);
  root.classList.toggle("scheme-light", !isDark);
  root.classList.remove("scheme-light-dark");
}

/** Applies and saves a selection, then notifies theme controls on this page. */
export function setThemePreference(preference: ThemePreference): void {
  applyThemePreference(preference);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
