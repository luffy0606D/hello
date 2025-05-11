import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Volume as VolumeUp } from 'lucide-react-native';
import { useAI } from '@/hooks/useAI';

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { colors, isDarkMode } = useTheme();
  const { speakMessage, currentMode } = useAI();
  
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  // Choose background color based on role and mode
  let backgroundColor;
  if (isUser) {
    backgroundColor = colors.primary;
  } else {
    switch(currentMode) {
      case 'deep':
        backgroundColor = '#6D28D980';
        break;
      case 'math':
        backgroundColor = '#3B82F680';
        break;
      case 'knowledge':
        backgroundColor = '#14B8A680';
        break;
      case 'student':
        backgroundColor = '#F9731680';
        break;
      case 'coding':
        backgroundColor = '#EC489980';
        break;
      case 'fun':
        backgroundColor = '#EAB30880';
        break;
      default:
        backgroundColor = isDarkMode ? '#27272A' : '#F4F4F5';
    }
  }
  
  const handleSpeak = () => {
    if (!isUser) {
      speakMessage(message.content);
    }
  };

  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.assistantContainer
    ]}>
      <View style={[
        styles.bubble,
        { backgroundColor },
        isUser ? styles.userBubble : styles.assistantBubble
      ]}>
        <Text style={[
          styles.message,
          { color: isUser ? '#FFFFFF' : colors.text }
        ]}>
          {message.content}
        </Text>
        
        <View style={styles.messageFooter}>
          <Text style={[
            styles.time,
            { color: isUser ? 'rgba(255, 255, 255, 0.7)' : colors.textSecondary }
          ]}>
            {time}
          </Text>
          
          {!isUser && (
            <TouchableOpacity 
              style={styles.speakButton} 
              onPress={handleSpeak}
            >
              <VolumeUp 
                size={16} 
                color={isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)'} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  assistantContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    borderBottomLeftRadius: 4,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 6,
  },
  time: {
    fontSize: 12,
  },
  speakButton: {
    marginLeft: 8,
    padding: 2,
  },
});