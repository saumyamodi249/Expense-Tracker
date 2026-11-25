// src/providers/AntdConfigProvider.tsx
import React, { useEffect, useSyncExternalStore } from "react";
import { ConfigProvider, App as AntdApp, theme as antdTheme } from "antd";
import { readStoredThemePreference, applyAccentColor, getAntdThemeConfig, DEFAULT_ACCENT } from "../themeprovide/theme";
import useProfileStore from "../store/profileStore";

type ColorScheme = "light" | "dark";

const systemThemeQuery = "(prefers-color-scheme: dark)";

function getColorScheme(): ColorScheme {
  if (typeof document === "undefined") return "light";
  const colorScheme = document.documentElement.dataset.colorScheme;
  if (colorScheme === "dark" || colorScheme === "light") return colorScheme;

  const stored = readStoredThemePreference();
  if (stored === "dark" || stored === "light") return stored;

  return window.matchMedia(systemThemeQuery).matches ? "dark" : "light";
}

function subscribeToColorScheme(onChange: () => void) {
  if (typeof document === "undefined") return () => {};

  const rootObserver = new MutationObserver(onChange);
  rootObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-color-scheme"],
  });

  const systemTheme = window.matchMedia(systemThemeQuery);
  systemTheme.addEventListener("change", onChange);

  return () => {
    rootObserver.disconnect();
    systemTheme.removeEventListener("change", onChange);
  };
}

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

export const AntdConfigProvider: React.FC<AntdConfigProviderProps> = ({
  children,
}) => {
  const colorScheme = useSyncExternalStore(
    subscribeToColorScheme,
    getColorScheme,
    () => "light",
  );
  const isDark = colorScheme === "dark";

  const rawAccent = useProfileStore((state) => state.appearance.accent);
  const accent = rawAccent || DEFAULT_ACCENT;

  // Apply theme accent color dynamically to CSS variables on mount & on change
  useEffect(() => {
    applyAccentColor(accent);
  }, [accent]);

  const themeConfig = getAntdThemeConfig(isDark, accent);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        ...themeConfig,
      }}
    >
      <AntdApp>
        {children}
      </AntdApp>
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
