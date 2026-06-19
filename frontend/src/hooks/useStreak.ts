import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export function useStreak() {
  const { streak, lastVisitDate, updateStreak } = useAppStore();
  
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return { streak, lastVisitDate };
}
