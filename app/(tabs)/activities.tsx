import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import { useState } from 'react';
import ExperienceModal, { Experience } from '../../components/ExperienceModal';

const dateOptions = [
  { id: 'today', label: 'Today', date: new Date() },
  { id: 'tomorrow', label: 'Tomorrow', date: addDays(new Date(), 1) },
  { id: 'weekend', label: 'Weekend', date: null },
];

const categories = [
  { id: 'all', label: 'ALL', icon: '🌟' },
  { id: 'wellness', label: 'WELLNESS', icon: '∞' },
  { id: 'yoga', label: 'YOGA', icon: '🧘' },
  { id: 'events', label: 'EVENTS', icon: '🎉' },
  { id: 'music', label: 'MUSIC', icon: '🎵' },
  { id: 'tours', label: 'TOURS', icon: '🗺' },
  { id: 'surf', label: 'SURF', icon: '🏄' },
  { id: 'impact', label: 'IMPACT', icon: '🌱' },
];

const activities: Experience[] = [
  {
    id: 1,
    name: 'Sunrise Beach Yoga',
    category: 'Yoga',
    time: '6 AM',
    date: 'MON, APR 15',
    price: 'FREE',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Playa Jaco, Puntarenas',
    duration: '60 minutes',
    groupSize: 'Up to 15 people',
    description: 'Start your day with an energizing beach yoga session as the sun rises over the Pacific. Perfect for all levels, this class combines gentle movements with breathwork and meditation.',
    includes: ['Yoga mat', 'Fresh coconut water', 'Beach towel', 'Professional instructor'],
  },
  {
    id: 2,
    name: 'Sunset Surf Session',
    category: 'Surf',
    time: '4 PM',
    date: 'MON, APR 15',
    price: '45',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'South Beach Break',
    duration: '2 hours',
    groupSize: '1-4 people',
    description: 'Catch the perfect wave during golden hour with our experienced instructors. This session is perfect for beginners and intermediate surfers looking to improve their skills.',
    includes: ['Surfboard rental', 'Wetsuit', 'Professional instructor', 'Safety equipment', 'Photos'],
  },
  {
    id: 3,
    name: 'Live Music & Tapas Night',
    category: 'Music',
    time: '7 PM',
    date: 'MON, APR 15',
    price: '25',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Rooftop Lounge',
    duration: '3 hours',
    groupSize: 'No limit',
    description: 'Enjoy an evening of live acoustic music paired with a selection of local and international tapas. Our resident musicians create the perfect atmosphere for a memorable night.',
    includes: ['Welcome drink', '3 tapas selections', 'Live music performance', 'Reserved seating'],
  },
  {
    id: 4,
    name: 'Rainforest Adventure Tour',
    category: 'Tours',
    time: '9 AM',
    date: 'TUE, APR 16',
    price: '85',
    image: 'https://images.unsplash.com/photo-1596392927852-2a18c787b27b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Manuel Antonio National Park',
    duration: '6 hours',
    groupSize: '2-8 people',
    description: 'Explore the stunning biodiversity of Costa Rica\'s rainforest. Spot exotic wildlife, learn about local flora, and enjoy breathtaking views on this guided adventure.',
    includes: ['Transportation', 'Professional guide', 'Lunch', 'Water', 'Park entrance fees', 'Binoculars'],
  },
  {
    id: 5,
    name: 'Full Moon Beach Meditation',
    category: 'Wellness',
    time: '8 PM',
    date: 'TUE, APR 16',
    price: 'FREE',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Secret Beach',
    duration: '90 minutes',
    groupSize: 'Up to 20 people',
    description: 'Experience the magic of meditation under the full moon. This guided session combines breathwork, sound healing, and meditation techniques for deep relaxation.',
    includes: ['Meditation cushion', 'Herbal tea', 'Journal', 'Crystal for meditation'],
  },
  {
    id: 6,
    name: 'Beach Clean-up & Workshop',
    category: 'Impact',
    time: '10 AM',
    date: 'WED, APR 17',
    price: 'FREE',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    location: 'Jaco Beach',
    duration: '2 hours',
    groupSize: 'No limit',
    description: 'Join our community effort to keep our beaches clean while learning about marine conservation. Includes an educational workshop on sustainable living.',
    includes: ['Clean-up materials', 'Reusable water bottle', 'Educational workshop', 'Certificate of participation'],
  }
];

export default function ActivitiesScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2;

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('weekend');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleExperiencePress = (experience: Experience) => {
    setSelectedExperience(experience);
    setModalVisible(true);
  };

  const handleBooking = (experience: Experience) => {
    // Handle booking logic here
    console.log('Booking experience:', experience.name);
    setModalVisible(false);
  };

  // Filter activities based on selected category
  const filteredActivities = activities.filter(activity => {
    if (selectedCategory === 'all') return true;
    return activity.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <>
      <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EXPERIENCES</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.location}>Selina Jaco, Costa Rica</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.dateContainer}
        >
          {dateOptions.map((option) => (
            <TouchableOpacity 
              key={option.id} 
              style={[
                styles.dateButton,
                option.id === selectedDate && styles.dateButtonActive
              ]}
              onPress={() => setSelectedDate(option.id)}
            >
              <Text 
                style={[
                  styles.dateButtonText,
                  option.id === selectedDate && styles.dateButtonTextActive
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.chooseDatesButton}>
            <CalendarIcon size={16} color="#1a1a1a" style={styles.calendarIcon} />
            <Text style={styles.chooseDatesText}>Choose dates</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={[
                  styles.categoryButton,
                  category.id === selectedCategory && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    category.id === selectedCategory && styles.categoryTextActive
                  ]}
                >
                  {category.icon} {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.statsRow}>
          <Text style={styles.experienceCount}>{filteredActivities.length} Experiences</Text>
          <TouchableOpacity onPress={() => setSelectedDate('today')}>
            <Text style={styles.resetDates}>Reset Dates</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activitiesGrid}>
          {filteredActivities.map((activity, index) => (
            <TouchableOpacity 
              key={activity.id} 
              style={[
                styles.activityCard,
                { width: cardWidth },
                index % 2 === 0 ? { marginRight: 8 } : { marginLeft: 8 }
              ]}
              onPress={() => handleExperiencePress(activity)}
            >
              <Image 
                source={{ uri: activity.image }} 
                style={styles.activityImage}
                resizeMode="cover"
              />
              <View style={styles.categoryIcon}>
                <Text>{categories.find(c => c.label.toUpperCase() === activity.category.toUpperCase())?.icon}</Text>
              </View>
              {activity.price === 'FREE' ? (
                <View style={styles.freeTag}>
                  <Text style={styles.freeTagText}>FREE</Text>
                </View>
              ) : (
                <View style={styles.priceTag}>
                  <Text style={styles.priceTagText}>${activity.price}</Text>
                </View>
              )}
              <View style={styles.activityInfo}>
                <Text style={styles.activityDate}>{activity.date} {activity.time}</Text>
                <Text style={styles.activityName}>{activity.name}</Text>
                <Text style={styles.activityLocation}>{activity.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ExperienceModal
        experience={selectedExperience}
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  locationContainer: {
    marginTop: 8,
  },
  location: {
    fontSize: 16,
    color: '#666666',
  },
  dateContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  dateButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  dateButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a1a',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  dateButtonTextActive: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
  chooseDatesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  calendarIcon: {
    marginRight: 6,
  },
  chooseDatesText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  categoryButtonActive: {
    backgroundColor: '#1a1a1a',
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  experienceCount: {
    fontSize: 14,
    color: '#666666',
  },
  resetDates: {
    fontSize: 14,
    color: '#1a1a1a',
    textDecorationLine: 'underline',
  },
  activitiesGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activityCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  activityImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  categoryIcon: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#1a1a1a',
  },
  freeTagText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  priceTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  priceTagText: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: '600',
  },
  activityInfo: {
    padding: 12,
  },
  activityDate: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    lineHeight: 18,
  },
  activityLocation: {
    fontSize: 12,
    color: '#666666',
  },
});