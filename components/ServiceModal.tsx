import { Modal, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { X, Clock, MapPin, Info, CreditCard } from 'lucide-react-native';

export type Service = {
  id: number;
  name: string;
  price: string;
  image: string;
  includes: string[];
  description?: string;
  duration?: string;
  location?: string;
  terms?: string[];
};

type ServiceModalProps = {
  service: Service | null;
  visible: boolean;
  onClose: () => void;
  onBook: (service: Service) => void;
};

export default function ServiceModal({ service, visible, onClose, onBook }: ServiceModalProps) {
  if (!service) return null;

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
              source={{ uri: service.image }} 
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.content}>
              <Text style={styles.title}>{service.name}</Text>
              
              <View style={styles.priceContainer}>
                <CreditCard size={20} color="#666666" />
                <Text style={styles.price}>${service.price}/day</Text>
              </View>

              {service.duration && (
                <View style={styles.detailRow}>
                  <Clock size={20} color="#666666" />
                  <Text style={styles.detailText}>Duration: {service.duration}</Text>
                </View>
              )}

              {service.location && (
                <View style={styles.detailRow}>
                  <MapPin size={20} color="#666666" />
                  <Text style={styles.detailText}>{service.location}</Text>
                </View>
              )}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About this service</Text>
                <Text style={styles.description}>
                  {service.description || 'Experience the best of what we have to offer with our premium services designed for your comfort and enjoyment.'}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>What's included</Text>
                {service.includes.map((item, index) => (
                  <View key={index} style={styles.includeItem}>
                    <Info size={16} color="#0EA5E9" />
                    <Text style={styles.includeText}>{item}</Text>
                  </View>
                ))}
              </View>

              {service.terms && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Terms & Conditions</Text>
                  {service.terms.map((term, index) => (
                    <View key={index} style={styles.termItem}>
                      <Text style={styles.termText}>• {term}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => onBook(service)}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0EA5E9',
    marginLeft: 8,
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
  termItem: {
    marginBottom: 8,
  },
  termText: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  bookButton: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});