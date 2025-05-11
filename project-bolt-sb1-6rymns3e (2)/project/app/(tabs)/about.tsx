import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, StatusBar, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Github, Mail as MailIcon, Heart, Coffee, ExternalLink, Instagram, IndianRupee } from 'lucide-react-native';

export default function AboutScreen() {
  const { isDarkMode, colors } = useTheme();
  
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>AI Assistant</Text>
          <Text style={[styles.version, { color: colors.primary }]}>Version 1.0.0</Text>
        </View>
        
        <View style={[styles.section, { backgroundColor: isDarkMode ? '#27272A' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About This App</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            AI Assistant is a powerful AI-powered chat application that helps you get answers to your questions, solve problems, 
            and have meaningful conversations. It supports both Hindi and English languages and offers multiple specialized 
            modes for different types of queries.
          </Text>
          <Text style={[styles.creatorText, { color: colors.primary }]}>
            Created with passion by LUFFY
          </Text>
        </View>
        
        <View style={[styles.section, { backgroundColor: isDarkMode ? '#27272A' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Bilingual support (Hindi and English)</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Voice and text interactions</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Specialized modes for different topics</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Day and night themes</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Offline functionality</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: isDarkMode ? '#27272A' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support the Project</Text>
          <Text style={[styles.supportText, { color: colors.textSecondary }]}>
            If you find this app helpful, consider supporting the development with a small contribution.
          </Text>
          <View style={styles.qrContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/16164180/pexels-photo-16164180.jpeg' }}
              style={styles.qrCode}
              resizeMode="contain"
            />
            <Text style={[styles.upiId, { color: colors.text }]}>
              UPI ID: patidarvishal113@okicici
            </Text>
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: isDarkMode ? '#27272A' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Connect</Text>
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('https://instagram.com/luffy___0606')}
          >
            <Instagram size={20} color={colors.primary} />
            <Text style={[styles.linkText, { color: colors.text }]}>@luffy___0606</Text>
            <ExternalLink size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('https://github.com/username/ai-assistant')}
          >
            <Github size={20} color={colors.primary} />
            <Text style={[styles.linkText, { color: colors.text }]}>GitHub Repository</Text>
            <ExternalLink size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('mailto:support@ai-assistant.com')}
          >
            <MailIcon size={20} color={colors.primary} />
            <Text style={[styles.linkText, { color: colors.text }]}>Contact Support</Text>
            <ExternalLink size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => openLink('https://ko-fi.com/username')}
          >
            <Coffee size={20} color={colors.primary} />
            <Text style={[styles.linkText, { color: colors.text }]}>Support the Project</Text>
            <ExternalLink size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Made with <Heart size={14} color="#F87171" style={{marginHorizontal: 4}} /> by LUFFY
          </Text>
          <Text style={[styles.copyright, { color: colors.textSecondary }]}>
            © 2025 AI Assistant. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    marginTop: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  creatorText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  supportText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 12,
    borderRadius: 12,
  },
  upiId: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E4E4E7',
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
  },
});