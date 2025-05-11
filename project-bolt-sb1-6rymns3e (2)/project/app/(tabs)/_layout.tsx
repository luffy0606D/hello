import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { MessageCircle, Grid2x2 as Grid, Settings, Info } from 'lucide-react-native';
import { AIProvider } from '@/context/AIContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabBarActiveTintColor = colorScheme === 'dark' ? '#A78BFA' : '#6D28D9';
  const tabBarInactiveTintColor = colorScheme === 'dark' ? '#71717A' : '#9CA3AF';
  const tabBarStyle = {
    backgroundColor: colorScheme === 'dark' ? '#18181B' : '#FFFFFF',
    borderTopColor: colorScheme === 'dark' ? '#27272A' : '#E4E4E7',
  };

  return (
    <ThemeProvider>
      <AIProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor,
            tabBarInactiveTintColor,
            tabBarStyle,
            tabBarShowLabel: true,
            tabBarLabelStyle: { fontSize: 12 },
            headerShown: true,
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#18181B' : '#FFFFFF',
            },
            headerTintColor: colorScheme === 'dark' ? '#F9FAFB' : '#111827',
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Chat',
              tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="modes"
            options={{
              title: 'Modes',
              tabBarIcon: ({ color, size }) => <Grid size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              title: 'About',
              tabBarIcon: ({ color, size }) => <Info size={size} color={color} />,
            }}
          />
        </Tabs>
      </AIProvider>
    </ThemeProvider>
  );
}