import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAI } from '@/hooks/useAI';
import { useRouter } from 'expo-router';
import { Brain, Calculator, BookOpen, Code, Smile, Globe, LightbulbOff } from 'lucide-react-native';

export default function ModesScreen() {
  const { isDarkMode, colors } = useTheme();
  const { setCurrentMode } = useAI();
  const router = useRouter();

  const modes = [
    {
      id: 'deep',
      title: 'Deep Questions',
      description: 'Philosophical and emotional intelligence',
      icon: <Brain size={32} color={colors.primary} />,
      color: '#6D28D9',
    },
    {
      id: 'math',
      title: 'Math Mode',
      description: 'Solve equations with step-by-step solutions',
      icon: <Calculator size={32} color={colors.secondary} />,
      color: '#3B82F6',
    },
    {
      id: 'knowledge',
      title: 'General Knowledge',
      description: 'Facts from history, science, and more',
      icon: <Globe size={32} color={colors.accent} />,
      color: '#14B8A6',
    },
    {
      id: 'student',
      title: 'Student Mode',
      description: 'Homework help and educational resources',
      icon: <BookOpen size={32} color="#F97316" />,
      color: '#F97316',
    },
    {
      id: 'coding',
      title: 'Coding Help',
      description: 'Programming assistance in multiple languages',
      icon: <Code size={32} color="#EC4899" />,
      color: '#EC4899',
    },
    {
      id: 'fun',
      title: 'Fun Mode',
      description: 'Jokes, riddles, and brain games',
      icon: <Smile size={32} color="#EAB308" />,
      color: '#EAB308',
    },
    {
      id: 'offline',
      title: 'Offline Mode',
      description: 'Basic features without internet',
      icon: <LightbulbOff size={32} color="#9CA3AF" />,
      color: '#9CA3AF',
    },
  ];

  const handleModeSelect = (modeId) => {
    setCurrentMode(modeId);
    router.push('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Text style={[styles.title, { color: colors.text }]}>Select a Mode</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Choose a specialized mode for your conversation
      </Text>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={[
              styles.modeCard,
              { backgroundColor: isDarkMode ? '#27272A' : '#FFFFFF' }
            ]}
            onPress={() => handleModeSelect(mode.id)}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${mode.color}20` }]}>
              {mode.icon}
            </View>
            <View style={styles.modeInfo}>
              <Text style={[styles.modeTitle, { color: colors.text }]}>{mode.title}</Text>
              <Text style={[styles.modeDescription, { color: colors.textSecondary }]}>
                {mode.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modeInfo: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
  },
});