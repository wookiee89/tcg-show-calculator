import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AppConfig } from './types.ts';
import { DEFAULT_CONFIG } from './defaults.ts';
import { loadConfigOverrides, saveConfigOverrides, clearConfigOverrides, mergeConfig } from './storage.ts';

interface ConfigContextValue {
  config: AppConfig;
  updateConfig: (overrides: Partial<AppConfig>) => void;
  resetConfig: () => void;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(() => {
    const overrides = loadConfigOverrides();
    return mergeConfig(overrides);
  });

  const updateConfig = useCallback((overrides: Partial<AppConfig>) => {
    const currentOverrides = loadConfigOverrides();
    const newOverrides = { ...currentOverrides, ...overrides };
    saveConfigOverrides(newOverrides);
    setConfig(mergeConfig(newOverrides));
  }, []);

  const resetConfig = useCallback(() => {
    clearConfigOverrides();
    setConfig(DEFAULT_CONFIG);
  }, []);

  return (
    <ConfigContext value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext>
  );
}

export function useConfig(): ConfigContextValue {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
}
