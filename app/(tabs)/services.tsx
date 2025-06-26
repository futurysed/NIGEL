import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import ServiceModal, { Service } from '../../components/ServiceModal';

const services: Service[] = [
  {
    id: 1,
    name: 'Scooter Rental',
    price: '15',
    image: 'https://images.unsplash.com/photo-1601147294274-825f4744fb20',
    description: 'Explore the beautiful coastal roads of Jaco with our premium scooter rentals. Perfect for solo travelers or couples looking for adventure.',
    duration: 'Daily rental (24 hours)',
    location: 'Pick up at Selina Jaco',
    includes: [
      'Helmet included',
      'Basic insurance coverage',
      'Free delivery to hotel',
      'Full tank of gas',
      '24/7 roadside assistance'
    ],
    terms: [
      'Valid driver\'s license required',
      'Security deposit of $100',
      'Must be 18 or older',
      'Return with full tank of gas'
    ]
  },
  {
    id: 2,
    name: 'Surfboard Rental',
    price: '25',
    image: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15',
    description: 'Catch the perfect wave with our high-quality surfboard rentals. We offer a variety of boards suitable for all skill levels.',
    duration: 'Daily rental (24 hours)',
    location: 'Playa Jaco Surf Shop',
    includes: [
      'Surfboard leash',
      'Wax',
      'Basic insurance',
      'Storage locker',
      'Basic surf guide'
    ],
    terms: [
      'Sign waiver required',
      'Security deposit of $50',
      'Report any damage immediately',
      'No refunds for weather conditions'
    ]
  },
  {
    id: 3,
    name: 'Airport Transfer',
    price: '45',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d',
    description: 'Start your vacation stress-free with our reliable airport transfer service. Comfortable vehicles and professional drivers.',
    duration: 'One-way transfer',
    location: 'SJO Airport to Selina Jaco',
    includes: [
      'Professional driver',
      'Air-conditioned vehicle',
      'Water bottle',
      'WiFi in vehicle',
      'Flight tracking'
    ],
    terms: [
      '24-hour cancellation policy',
      'Maximum 2 large bags per person',
      'Child seats available on request',
      'Wait time up to 60 minutes'
    ]
  },
  {
    id: 4,
    name: 'Bike Rental',
    price: '10',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
    description: 'Discover Jaco at your own pace with our comfortable city bikes. Perfect for beach cruising and local exploration.',
    duration: 'Daily rental (24 hours)',
    location: 'Pick up at Selina Jaco',
    includes: [
      'Helmet',
      'Bike lock',
      'Basic insurance',
      'Basket',
      'Basic maintenance kit'
    ],
    terms: [
      'ID required for rental',
      'Security deposit of $50',
      'Report any issues immediately',
      'Lock bike at designated areas'
    ]
  },
];

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleServicePress = (service: Service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const handleBooking = (service: Service) => {
    // Handle booking logic here
    console.log('Booking service:', service.name);
    setModalVisible(false);
  };

  return (
    <>
      <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.header}>Services</Text>
        <Text style={styles.subheader}>Book services for your stay</Text>

        {services.map((service) => (
          <TouchableOpacity 
            key={service.id} 
            style={styles.serviceCard}
            onPress={() => handleServicePress(service)}
          >
            <Image source={{ uri: service.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>${service.price}/day</Text>
              
              <Text style={styles.includesTitle}>Includes:</Text>
              {service.includes.slice(0, 3).map((item, index) => (
                <Text key={index} style={styles.includesItem}>• {item}</Text>
              ))}
              {service.includes.length > 3 && (
                <Text style={styles.moreItems}>+{service.includes.length - 3} more items</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ServiceModal
        service={selectedService}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onBook={handleBooking}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  subheader: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 200,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  servicePrice: {
    fontSize: 18,
    color: '#0EA5E9',
    marginTop: 4,
  },
  includesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 8,
  },
  includesItem: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  moreItems: {
    fontSize: 14,
    color: '#0EA5E9',
    marginTop: 4,
    fontWeight: '500',
  },
});