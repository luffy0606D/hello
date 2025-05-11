import React from 'react';
import { StyleSheet, View, Text, Switch, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAI } from '@/hooks/useAI';
import { Sun, Moon, Volume2, VolumeX, Languages, MessageSquare, FileText } from 'lucide-react-native';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { language, toggleLanguage, voiceEnabled, toggleVoice, chatHistory, clearHistory } = useAI();

  const settingsSections = [
    {
      title: 'Appearance',
      settings: [
        {
          id: 'theme',
          title: 'Dark Mode',
          description: 'Toggle between light and dark theme',
          icon: isDarkMode ? <Moon size={24} color={colors.primary} /> : <Sun size={24} color={colors.primary} />,
          action: (
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#E4E4E7', true: '#A78BFA' }}
              thumbColor={isDarkMode ? '#6D28D9' : '#FFFFFF'}
            />
          ),
        },
      ],
    },
    {
      title: 'Language',
      settings: [
        {
          id: 'language',
          title: 'Language',
          description: language === 'en' ? 'Currently: English' : 'Currently: Hindi',
          icon: <Languages size={24} color={colors.secondary} />,
          action: (
            <Switch
              value={language === 'hi'}
              onValueChange={toggleLanguage}
              trackColor={{ false: '#E4E4E7', true: '#93C5FD' }}
              thumbColor={language === 'hi' ? '#3B82F6' : '#FFFFFF'}
            />
          ),
        },
      ],
    },
    {
      title: 'Voice Settings',
      settings: [
        {
          id: 'voice',
          title: 'Voice Feedback',
          description: 'Enable or disable voice responses',
          icon: voiceEnabled ? <Volume2 size={24} color={colors.accent} /> : <VolumeX size={24} color={colors.accent} />,
          action: (
            <Switch
              value={voiceEnabled}
              onValueChange={toggleVoice}
              trackColor={{ false: '#E4E4E7', true: '#99F6E4' }}
              thumbColor={voiceEnabled ? '#14B8A6' : '#FFFFFF'}
            />
          ),
        },
      ],
    },
    {
      title: 'Data',
      settings: [
        {
          id: 'history',
          title: 'Chat History',
          description: 'Clear all previous conversations',
          icon: <MessageSquare size={24} color="#F87171" />,
          action: (
            <TouchableOpacity 
              style={styles.button} 
              onPress={clearHistory}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          ),
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      
      <ScrollView style={styles.scrollView}>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {section.title}
            </Text>
            {section.settings.map((setting) => (
              <View
                key={setting.id}
                style={[
                  styles.settingItem,
                  { backgroundColor: isDarkMode ? '#27272A' : '#FFFFFF' },
                ]}
              >
                <View style={styles.settingIcon}>{setting.icon}</View>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    {setting.title}
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    {setting.description}
                  </Text>
                </View>
                <View style={styles.settingAction}>{setting.action}</View>
              </View>
            ))}
          </View>
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
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    paddingLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  settingIcon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  settingAction: {
    minWidth: 60,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F87171',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});