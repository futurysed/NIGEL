import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { Sun, Cloud, Waves, MessageCircle, Users, Calendar } from 'lucide-react-native';
import { useState } from 'react';
import ChatModal from '../../components/ChatModal';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const currentDate = new Date();
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <>
      <ScrollView 
        style={[styles.container]} 
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 20
        }}
      >
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1564419429381-98dbcf916478' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>Welcome to</Text>
              <Text style={styles.brandText}>Homebase</Text>
            </View>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.weatherCard}>
          <View style={styles.weatherInfo}>
            <Sun size={24} color="#FF9500" />
            <Text style={styles.weatherText}>28°C</Text>
          </View>
          <View style={styles.weatherInfo}>
            <Cloud size={24} color="#0EA5E9" />
            <Text style={styles.weatherText}>Clear</Text>
          </View>
          <View style={styles.weatherInfo}>
            <Waves size={24} color="#0EA5E9" />
            <Text style={styles.weatherText}>2-3ft</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Today's Activities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activitiesScroll}>
          {['Yoga Session', 'Beach Clean-up', 'Sound Healing'].map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <Image
                source={{ uri: `https://source.unsplash.com/random/400x300?${activity.toLowerCase()}` }}
                style={styles.activityImage}
              />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity}</Text>
                <Text style={styles.activityTime}>{format(new Date().setHours(8 + index * 2, 0), 'h:mm a')}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilitiesGrid}>
          {['Coworking', 'Pool', 'Gym', 'Restaurant'].map((facility, index) => (
            <View key={index} style={styles.facilityCard}>
              <Image
                source={{ uri: `https://source.unsplash.com/random/200x200?${facility.toLowerCase()}` }}
                style={styles.facilityImage}
              />
              <View style={styles.facilityInfo}>
                <Text style={styles.facilityTitle}>{facility}</Text>
                <Text style={styles.facilityStatus}>Open Now</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => setChatVisible(true)}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: '#E0F2FE' }]}>
                <MessageCircle size={24} color="#0EA5E9" />
              </View>
              <Text style={styles.quickAccessText}>Talk to Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessButton}>
              <View style={[styles.quickAccessIcon, { backgroundColor: '#FCE7F3' }]}>
                <Users size={24} color="#EC4899" />
              </View>
              <Text style={styles.quickAccessText}>Community</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessButton}>
              <View style={[styles.quickAccessIcon, { backgroundColor: '#ECFDF5' }]}>
                <Calendar size={24} color="#10B981" />
              </View>
              <Text style={styles.quickAccessText}>Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ChatModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
  },
  welcomeTextContainer: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0EA5E9',
    letterSpacing: 0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  weatherCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherInfo: {
    alignItems: 'center',
  },
  weatherText: {
    marginTop: 8,
    fontSize: 16,
    color: '#0F172A',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginHorizontal: 20,
    marginTop: 20,
  },
  activitiesScroll: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  activityCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  activityInfo: {
    padding: 16,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  activityTime: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 16,
  },
  facilityCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  facilityImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  facilityInfo: {
    padding: 12,
  },
  facilityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  facilityStatus: {
    fontSize: 12,
    color: '#10B981',
    marginTop: 4,
  },
  quickAccessSection: {
    marginBottom: 32,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  quickAccessButton: {
    alignItems: 'center',
    width: '30%',
  },
  quickAccessIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    textAlign: 'center',
  },
});