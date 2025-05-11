import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { Mic, CircleStop as StopCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { Platform } from 'react-native';

interface VoiceButtonProps {
  onTextCapture: (text: string) => void;
}

export default function VoiceButton({ onTextCapture }: VoiceButtonProps) {
  const { colors, isDarkMode } = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlatformSupported, setIsPlatformSupported] = useState(true);
  
  const pulseAnim = new Animated.Value(1);
  
  useEffect(() => {
    // Check if voice recording is supported on this platform
    setIsPlatformSupported(Platform.OS !== 'web');
    
    // Simulated voice recording for demonstration
    if (isRecording) {
      startPulseAnimation();
      
      // Simulate voice capture after 3 seconds
      const timer = setTimeout(() => {
        setIsRecording(false);
        onTextCapture("This is a simulated voice message from the VoiceButton component.");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isRecording]);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handlePress = () => {
    if (!isPlatformSupported) {
      // Show message that voice recording is not supported on web
      onTextCapture("Voice recording is not supported in the web version. Please use the text input instead.");
      return;
    }
    
    setIsRecording(!isRecording);
  };

  return (
    <View style={styles.container}>
      {isRecording && (
        <Animated.View
          style={[
            styles.pulse,
            {
              backgroundColor: colors.primary + '40',
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
      )}
      
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.button,
          {
            backgroundColor: isRecording ? '#EF4444' : colors.primary,
          },
        ]}
      >
        {isRecording ? (
          <StopCircle size={28} color="#FFFFFF" />
        ) : (
          <Mic size={28} color="#FFFFFF" />
        )}
      </TouchableOpacity>
      
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <Text style={[styles.recordingText, { color: colors.text }]}>
            Listening...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    zIndex: -1,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  recordingIndicator: {
    position: 'absolute',
    top: -40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});