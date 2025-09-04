import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Search,
  Plus,
  UserCheck,
  UserX,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CreditCard,
  X,
  Users,
} from 'lucide-react-native';

export default function GuestsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const guests = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 555-0123',
      room: '203',
      checkIn: '2024-01-22',
      checkOut: '2024-01-25',
      status: 'checked-in',
      guests: 2,
      paymentStatus: 'paid',
      address: '123 Main St, New York, NY',
      specialRequests: 'Extra towels, late checkout',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 555-0124',
      room: 'Pending',
      checkIn: '2024-01-24',
      checkOut: '2024-01-27',
      status: 'reservation',
      guests: 1,
      paymentStatus: 'pending',
      address: '456 Oak Ave, Los Angeles, CA',
      specialRequests: 'Ground floor room',
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 555-0125',
      room: '105',
      checkIn: '2024-01-20',
      checkOut: '2024-01-24',
      status: 'checked-out',
      guests: 3,
      paymentStatus: 'paid',
      address: '789 Pine St, Chicago, IL',
      specialRequests: 'None',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 555-0126',
      room: '308',
      checkIn: '2024-01-23',
      checkOut: '2024-01-26',
      status: 'checked-in',
      guests: 2,
      paymentStatus: 'paid',
      address: '321 Elm St, Miami, FL',
      specialRequests: 'Baby crib',
    },
  ];

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in':
        return '#10B981';
      case 'checked-out':
        return '#6B7280';
      case 'reservation':
        return '#3B82F6';
      default:
        return '#9CA3AF';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'overdue':
        return '#EF4444';
      default:
        return '#9CA3AF';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Guest Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCheckinModal(true)}
        >
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <StatCard
          title="Checked In"
          count={guests.filter(g => g.status === 'checked-in').length}
          color="#10B981"
          icon={UserCheck}
        />
        <StatCard
          title="Reservations"
          count={guests.filter(g => g.status === 'reservation').length}
          color="#3B82F6"
          icon={Calendar}
        />
        <StatCard
          title="Total Guests"
          count={guests.reduce((sum, g) => sum + g.guests, 0)}
          color="#8B5CF6"
          icon={Users}
        />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search color="#9CA3AF" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search guests, rooms, email..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Guests List */}
      <ScrollView style={styles.guestsList}>
        {filteredGuests.map((guest) => (
          <GuestCard
            key={guest.id}
            guest={guest}
            onPress={() => {
              setSelectedGuest(guest);
              setShowCheckinModal(true);
            }}
          />
        ))}
      </ScrollView>

      {/* Guest Details Modal */}
      <Modal
        visible={showCheckinModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCheckinModal(false)}
      >
        <GuestDetailsModal
          guest={selectedGuest}
          onClose={() => {
            setShowCheckinModal(false);
            setSelectedGuest(null);
          }}
        />
      </Modal>
    </View>
  );
}

function StatCard({ title, count, color, icon: Icon }: {
  title: string;
  count: number;
  color: string;
  icon: any;
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Icon color="#ffffff" size={20} />
      </View>
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function GuestCard({ guest, onPress }: { guest: any; onPress: () => void }) {
  const statusColor = getStatusColor(guest.status);
  const paymentColor = getPaymentStatusColor(guest.paymentStatus);

  return (
    <TouchableOpacity style={styles.guestCard} onPress={onPress}>
      <View style={styles.guestHeader}>
        <View style={styles.guestInfo}>
          <Text style={styles.guestName}>{guest.name}</Text>
          <View style={styles.guestDetails}>
            <Mail color="#9CA3AF" size={14} />
            <Text style={styles.guestEmail}>{guest.email}</Text>
          </View>
          <View style={styles.guestDetails}>
            <Phone color="#9CA3AF" size={14} />
            <Text style={styles.guestPhone}>{guest.phone}</Text>
          </View>
        </View>
        <View style={styles.guestMeta}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>
              {guest.status.replace('-', ' ').toUpperCase()}
            </Text>
          </View>
          <Text style={styles.roomNumber}>Room {guest.room}</Text>
        </View>
      </View>

      <View style={styles.guestFooter}>
        <View style={styles.dateInfo}>
          <Text style={styles.dateLabel}>Check-in: {guest.checkIn}</Text>
          <Text style={styles.dateLabel}>Check-out: {guest.checkOut}</Text>
        </View>
        <View style={styles.guestStats}>
          <View style={styles.statItem}>
            <Users color="#9CA3AF" size={16} />
            <Text style={styles.statText}>{guest.guests}</Text>
          </View>
          <View style={[styles.paymentBadge, { borderColor: paymentColor }]}>
            <Text style={[styles.paymentText, { color: paymentColor }]}>
              {guest.paymentStatus.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function GuestDetailsModal({ guest, onClose }: { guest: any; onClose: () => void }) {
  if (!guest) return null;

  const statusColor = getStatusColor(guest.status);
  const paymentColor = getPaymentStatusColor(guest.paymentStatus);

  const handleCheckIn = () => {
    Alert.alert('Check-in', `Check in ${guest.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Check In', onPress: () => onClose() },
    ]);
  };

  const handleCheckOut = () => {
    Alert.alert('Check-out', `Check out ${guest.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Check Out', onPress: () => onClose() },
    ]);
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{guest.name}</Text>
          <TouchableOpacity onPress={onClose}>
            <X color="#9CA3AF" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.guestDetails}>
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Guest Information</Text>
            
            <View style={styles.detailRow}>
              <Mail color="#9CA3AF" size={20} />
              <Text style={styles.detailText}>{guest.email}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Phone color="#9CA3AF" size={20} />
              <Text style={styles.detailText}>{guest.phone}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <MapPin color="#9CA3AF" size={20} />
              <Text style={styles.detailText}>{guest.address}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Users color="#9CA3AF" size={20} />
              <Text style={styles.detailText}>{guest.guests} guests</Text>
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Reservation Details</Text>
            
            <View style={styles.detailRow}>
              <Calendar color="#9CA3AF" size={20} />
              <Text style={styles.detailText}>
                {guest.checkIn} - {guest.checkOut}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Room:</Text>
              <Text style={styles.detailValue}>{guest.room}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                <Text style={styles.statusText}>
                  {guest.status.replace('-', ' ').toUpperCase()}
                </Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <CreditCard color="#9CA3AF" size={20} />
              <View style={[styles.paymentBadge, { borderColor: paymentColor }]}>
                <Text style={[styles.paymentText, { color: paymentColor }]}>
                  {guest.paymentStatus.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Special Requests</Text>
            <Text style={styles.requestText}>{guest.specialRequests}</Text>
          </View>
        </ScrollView>

        <View style={styles.modalActions}>
          {guest.status === 'reservation' && (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981' }]} onPress={handleCheckIn}>
              <UserCheck color="#ffffff" size={20} />
              <Text style={styles.actionButtonText}>Check In</Text>
            </TouchableOpacity>
          )}
          
          {guest.status === 'checked-in' && (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3B82F6' }]} onPress={handleCheckOut}>
              <UserX color="#ffffff" size={20} />
              <Text style={styles.actionButtonText}>Check Out</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6B7280' }]}>
            <Phone color="#ffffff" size={20} />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  guestsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  guestCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  guestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  guestInfo: {
    flex: 1,
  },
  guestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  guestDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  guestEmail: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  guestPhone: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  guestMeta: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  roomNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  guestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  guestStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  paymentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  paymentText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  guestDetails: {
    flex: 1,
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#9CA3AF',
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    width: 60,
  },
  detailValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  requestText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
