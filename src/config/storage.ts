import type { AppConfig } from './types.ts';
import { DEFAULT_CONFIG } from './defaults.ts';

const STORAGE_KEY = 'woobul-config-overrides';

export function loadConfigOverrides(): Partial<AppConfig> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored) as Partial<AppConfig>;
  } catch {
    return {};
  }
}

export function saveConfigOverrides(overrides: Partial<AppConfig>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // localStorage may be full or unavailable
  }
}

export function clearConfigOverrides(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function mergeConfig(overrides: Partial<AppConfig>): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...overrides,
    sellingCosts: {
      ...DEFAULT_CONFIG.sellingCosts,
      ...(overrides.sellingCosts ?? {}),
    },
    misprintFees: {
      ...DEFAULT_CONFIG.misprintFees,
      ...(overrides.misprintFees ?? {}),
    },
    branding: {
      ...DEFAULT_CONFIG.branding,
      ...(overrides.branding ?? {}),
    },
  };
}
