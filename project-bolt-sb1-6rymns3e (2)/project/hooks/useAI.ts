import { useContext } from 'react';
import { AIContext } from '@/context/AIContext';

// Re-export the useAI hook for convenience
export const useAI = () => useContext(AIContext);