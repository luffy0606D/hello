import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define color themes
const lightTheme = {
  primary: '#6D28D9', // vibrant purple
  secondary: '#3B82F6', // blue
  accent: '#14B8A6', // teal
  success: '#10B981', // green
  warning: '#F59E0B', // amber
  error: '#EF4444', // red
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  text: '#111827',
  textSecondary: '#4B5563',
  border: '#E5E7EB',
  disabled: '#D1D5DB',
};

const darkTheme = {
  primary: '#A78BFA', // lighter purple for dark mode
  secondary: '#60A5FA', // lighter blue
  accent: '#2DD4BF', // lighter teal
  success: '#34D399', // lighter green
  warning: '#FBBF24', // lighter amber
  error: '#F87171', // lighter red
  background: '#18181B', // zinc-900
  cardBackground: '#27272A', // zinc-800
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  border: '#374151',
  disabled: '#6B7280',
};

// Define the shape of our context
interface ThemeContextProps {
  isDarkMode: boolean;
  colors: typeof lightTheme;
  toggleTheme: () => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  colors: lightTheme,
  toggleTheme: () => {},
});

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get the device color scheme
  const deviceColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === 'dark');
  
  // Update theme when device settings change
  useEffect(() => {
    setIsDarkMode(deviceColorScheme === 'dark');
  }, [deviceColorScheme]);
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  
  // Select theme based on current mode
  const colors = isDarkMode ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);