'use client';

import { useSyncExternalStore } from 'react';
import {
  getStoredStateServerSnapshot,
  getStoredStateSnapshot,
  subscribeToStoredState,
} from './storage';

export function useStoredReviewState() {
  return useSyncExternalStore(
    subscribeToStoredState,
    getStoredStateSnapshot,
    getStoredStateServerSnapshot
  );
}
