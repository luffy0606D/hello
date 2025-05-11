import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import ChatInterface from '@/components/ChatInterface';
import VoiceButton from '@/components/VoiceButton';
import { useAI } from '@/hooks/useAI';
import { useTheme } from '@/context/ThemeContext';
import WelcomeScreen from '@/components/WelcomeScreen';

export default function ChatScreen() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { isDarkMode, colors } = useTheme();
  const { isLoading, messages, sendMessage, clearMessages } = useAI();

  const dismissWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: colors.background }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {showWelcome ? (
          <WelcomeScreen onDismiss={dismissWelcome} />
        ) : (
          <View style={styles.chatContainer}>
            <ChatInterface
              messages={messages}
              isLoading={isLoading}
              onSendMessage={sendMessage}
              onClearChat={clearMessages}
            />
            <VoiceButton onTextCapture={sendMessage} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    position: 'relative',
  },
});