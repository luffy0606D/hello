import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Send, Trash2 } from 'lucide-react-native';
import ChatMessage from './ChatMessage';

interface ChatInterfaceProps {
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
}

export default function ChatInterface({
  messages,
  isLoading,
  onSendMessage,
  onClearChat,
}: ChatInterfaceProps) {
  const { colors, isDarkMode } = useTheme();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    onSendMessage(inputText.trim());
    setInputText('');
    Keyboard.dismiss();
  };

  const renderEmptyChat = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        Start a new conversation
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        Ask me anything in English or Hindi!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {messages.length > 0 && (
        <TouchableOpacity 
          style={[styles.clearButton, { backgroundColor: isDarkMode ? '#27272A' : '#F4F4F5' }]} 
          onPress={onClearChat}
        >
          <Trash2 size={16} color={isDarkMode ? '#A1A1AA' : '#71717A'} />
          <Text style={[styles.clearButtonText, { color: isDarkMode ? '#A1A1AA' : '#71717A' }]}>
            Clear chat
          </Text>
        </TouchableOpacity>
      )}
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage message={item} />}
        contentContainerStyle={styles.messageList}
        ListEmptyComponent={renderEmptyChat}
        onContentSizeChange={() => 
          messages.length > 0 && flatListRef.current?.scrollToEnd({ animated: false })
        }
      />
      
      {isLoading && (
        <View style={[styles.loadingContainer, { backgroundColor: colors.cardBackground }]}>
          <ActivityIndicator color={colors.primary} size="small" />
          <Text style={[styles.loadingText, { color: colors.text }]}>Thinking...</Text>
        </View>
      )}
      
      <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground }]}>
        <TextInput
          style={[
            styles.input,
            { 
              color: colors.text,
              backgroundColor: isDarkMode ? '#27272A' : '#F4F4F5' 
            }
          ]}
          placeholder="Type a message..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: inputText.trim() ? colors.primary : colors.disabled }
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  messageList: {
    padding: 16,
    paddingBottom: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(150, 150, 150, 0.2)',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 120,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});