import { Modal, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { X, Clock, MapPin, Users, Info } from 'lucide-react-native';

export type Experience = {
  id: number;
  name: string;
  category: string;
  time: string;
  date: string;
  price: string;
  image: string;
  location: string;
  description?: string;
  duration?: string;
  groupSize?: string;
  includes?: string[];
};

type ExperienceModalProps = {
  experience: Experience | null;
  visible: boolean;
  onClose: () => void;
  onBook: (experience: Experience) => void;
};

export default function ExperienceModal({ experience, visible, onClose, onBook }: ExperienceModalProps) {
  if (!experience) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#1a1a1a" />
          </TouchableOpacity>

          <ScrollView style={styles.scrollView}>
            <Image 
              source={{ uri: experience.image }} 
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.content}>
              <Text style={styles.category}>{experience.category}</Text>
              <Text style={styles.title}>{experience.name}</Text>
              
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Clock size={20} color="#666666" />
                  <Text style={styles.infoText}>{experience.time}</Text>
                </View>
                <View style={styles.infoItem}>
                  <MapPin size={20} color="#666666" />
                  <Text style={styles.infoText}>{experience.location}</Text>
                </View>
              </View>

              {experience.duration && (
                <View style={styles.detailRow}>
                  <Clock size={20} color="#666666" />
                  <Text style={styles.detailText}>Duration: {experience.duration}</Text>
                </View>
              )}

              {experience.groupSize && (
                <View style={styles.detailRow}>
                  <Users size={20} color="#666666" />
                  <Text style={styles.detailText}>Group Size: {experience.groupSize}</Text>
                </View>
              )}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About this experience</Text>
                <Text style={styles.description}>
                  {experience.description || 'Join us for an unforgettable experience in the heart of Costa Rica. This activity is perfect for those seeking adventure, relaxation, and authentic local culture.'}
                </Text>
              </View>

              {experience.includes && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>What's included</Text>
                  {experience.includes.map((item, index) => (
                    <View key={index} style={styles.includeItem}>
                      <Info size={16} color="#0EA5E9" />
                      <Text style={styles.includeText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>
                {experience.price === 'FREE' ? 'FREE' : `$${experience.price}`}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => onBook(experience)}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '90%',
    ...Platform.select({
      web: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
      },
    }),
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 24,
  },
  category: {
    fontSize: 14,
    color: '#0EA5E9',
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  infoText: {
    marginLeft: 8,
    color: '#666666',
    fontSize: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 8,
    color: '#666666',
    fontSize: 14,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  includeText: {
    marginLeft: 8,
    color: '#666666',
    fontSize: 14,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  bookButton: {
    backgroundColor: '#0EA5E9',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 24,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});