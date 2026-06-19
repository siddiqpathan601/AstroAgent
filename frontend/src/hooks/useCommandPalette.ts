import { useEffect, useCallback } from 'react';
import { useAppStore } from '../store/appStore';

export function useCommandPalette() {
  const { commandPaletteOpen, openCommandPalette, closeCommandPalette } = useAppStore();

  const toggle = useCallback(() => {
    commandPaletteOpen ? closeCommandPalette() : openCommandPalette();
  }, [commandPaletteOpen, openCommandPalette, closeCommandPalette]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        closeCommandPalette();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggle, commandPaletteOpen, closeCommandPalette]);

  return { isOpen: commandPaletteOpen, open: openCommandPalette, close: closeCommandPalette };
}
