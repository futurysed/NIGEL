import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { X, Send, User } from 'lucide-react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
};

type ChatModalProps = {
  visible: boolean;
  onClose: () => void;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "👋 Hi there! Welcome to Homebase. How can we help you today?",
    sender: 'agent',
    timestamp: new Date(),
  }
];

export default function ChatModal({ visible, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useState<ScrollView | null>(null);
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: messages.length + 2,
        text: "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our activities and services.",
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { paddingTop: insets.top }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <User size={24} color="#FFFFFF" />
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Homebase Support</Text>
                <Text style={styles.headerStatus}>Usually replies within an hour</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Chat Messages */}
          <ScrollView 
            style={styles.messagesContainer}
            ref={ref => scrollViewRef[0] = ref}
            onContentSizeChange={() => scrollViewRef[0]?.scrollToEnd({ animated: true })}
            contentContainerStyle={{ paddingBottom: 16 }}
          >
            {messages.map((message) => (
              <View 
                key={message.id} 
                style={[
                  styles.messageWrapper,
                  message.sender === 'user' ? styles.userMessageWrapper : styles.agentMessageWrapper
                ]}
              >
                <View 
                  style={[
                    styles.message,
                    message.sender === 'user' ? styles.userMessage : styles.agentMessage
                  ]}
                >
                  <Text style={[
                    styles.messageText,
                    message.sender === 'user' ? styles.userMessageText : styles.agentMessageText
                  ]}>
                    {message.text}
                  </Text>
                  <Text style={[
                    styles.timestamp,
                    message.sender === 'user' ? styles.userTimestamp : styles.agentTimestamp
                  ]}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Input Area */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.inputContainer, { paddingBottom: insets.bottom }]}
          >
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
              placeholderTextColor="#A1A1AA"
            />
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSend}
              disabled={!newMessage.trim()}
            >
              <Send size={24} color={newMessage.trim() ? '#0EA5E9' : '#A1A1AA'} />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      web: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
      },
    }),
  },
  header: {
    backgroundColor: '#0EA5E9',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerStatus: {
    color: '#E0F2FE',
    fontSize: 14,
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAFC',
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  agentMessageWrapper: {
    justifyContent: 'flex-start',
  },
  message: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    elevation: 1,
  },
  userMessage: {
    backgroundColor: '#0EA5E9',
    borderBottomRightRadius: 4,
  },
  agentMessage: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  agentMessageText: {
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  agentTimestamp: {
    color: '#6B7280',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingRight: 48,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
    color: '#1F2937',
  },
  sendButton: {
    padding: 8,
  },
});