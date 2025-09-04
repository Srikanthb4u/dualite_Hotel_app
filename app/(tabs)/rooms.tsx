import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Bed,
  Search,
  Filter,
  Settings,
  Users,
  Wifi,
  Coffee,
  Car,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react-native';

export default function RoomsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    {
      id: 1,
      number: '101',
      type: 'Standard',
      status: 'occupied',
      guest: 'John Smith',
      checkOut: '2024-01-25',
      price: 120,
      amenities: ['wifi', 'coffee'],
      lastCleaned: '2024-01-24',
    },
    {
      id: 2,
      number: '102',
      type: 'Standard',
      status: 'available',
      guest: null,
      checkOut: null,
      price: 120,
      amenities: ['wifi', 'coffee'],
      lastCleaned: '2024-01-24',
    },
    {
      id: 3,
      number: '201',
      type: 'Premium',
      status: 'maintenance',
      guest: null,
      checkOut: null,
      price: 180,
      amenities: ['wifi', 'coffee', 'parking'],
      lastCleaned: '2024-01-23',
    },
    {
      id: 4,
      number: '202',
      type: 'Premium',
      status: 'cleaning',
      guest: null,
      checkOut: null,
      price: 180,
      amenities: ['wifi', 'coffee', 'parking'],
      lastCleaned: '2024-01-24',
    },
    {
      id: 5,
      number: '301',
      type: 'Suite',
      status: 'occupied',
      guest: 'Sarah Johnson',
      checkOut: '2024-01-26',
      price: 250,
      amenities: ['wifi', 'coffee', 'parking'],
      lastCleaned: '2024-01-24',
    },
    {
      id: 6,
      number: '302',
      type: 'Suite',
      status: 'available',
      guest: null,
      checkOut: null,
      price: 250,
      amenities: ['wifi', 'coffee', 'parking'],
      lastCleaned: '2024-01-24',
    },
  ];

  const filters = [
    { key: 'all', label: 'All Rooms' },
    { key: 'available', label: 'Available' },
    { key: 'occupied', label: 'Occupied' },
    { key: 'cleaning', label: 'Cleaning' },
    { key: 'maintenance', label: 'Maintenance' },
  ];

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#10B981';
      case 'occupied':
        return '#3B82F6';
      case 'cleaning':
        return '#F59E0B';
      case 'maintenance':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getRoomStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return CheckCircle;
      case 'occupied':
        return Users;
      case 'cleaning':
        return Clock;
      case 'maintenance':
        return AlertTriangle;
      default:
        return XCircle;
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.includes(searchQuery) || 
                         room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (room.guest && room.guest.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || room.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Room Management</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color="#9CA3AF" size={24} />
        </TouchableOpacity>
      </View>

      {/* Status Overview */}
      <View style={styles.statusContainer}>
        <StatusCard title="Total" count={statusCounts.total} color="#6B7280" />
        <StatusCard title="Available" count={statusCounts.available} color="#10B981" />
        <StatusCard title="Occupied" count={statusCounts.occupied} color="#3B82F6" />
        <StatusCard title="Cleaning" count={statusCounts.cleaning} color="#F59E0B" />
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search color="#9CA3AF" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rooms, guests..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#059669" size={20} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              selectedFilter === filter.key && styles.filterTabActive,
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedFilter === filter.key && styles.filterTabTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Rooms Grid */}
      <ScrollView style={styles.roomsList}>
        <View style={styles.roomsGrid}>
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onPress={() => {
                setSelectedRoom(room);
                setShowRoomModal(true);
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Room Details Modal */}
      <Modal
        visible={showRoomModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRoomModal(false)}
      >
        {selectedRoom && (
          <RoomDetailsModal
            room={selectedRoom}
            onClose={() => setShowRoomModal(false)}
          />
        )}
      </Modal>
    </View>
  );
}

function StatusCard({ title, count, color }: {
  title: string;
  count: number;
  color: string;
}) {
  return (
    <View style={styles.statusCard}>
      <View style={[styles.statusIndicator, { backgroundColor: color }]} />
      <Text style={styles.statusCount}>{count}</Text>
      <Text style={styles.statusTitle}>{title}</Text>
    </View>
  );
}

function RoomCard({ room, onPress }: { room: any; onPress: () => void }) {
  const StatusIcon = getRoomStatusIcon(room.status);
  const statusColor = getRoomStatusColor(room.status);

  return (
    <TouchableOpacity style={styles.roomCard} onPress={onPress}>
      <View style={styles.roomHeader}>
        <Text style={styles.roomNumber}>{room.number}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <StatusIcon color="#ffffff" size={12} />
        </View>
      </View>
      
      <Text style={styles.roomType}>{room.type}</Text>
      <Text style={[styles.roomStatus, { color: statusColor }]}>
        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
      </Text>
      
      {room.guest && (
        <View style={styles.guestInfo}>
          <Text style={styles.guestName}>{room.guest}</Text>
          <Text style={styles.checkOutDate}>Until {room.checkOut}</Text>
        </View>
      )}
      
      <View style={styles.roomFooter}>
        <Text style={styles.roomPrice}>${room.price}/night</Text>
        <View style={styles.amenities}>
          {room.amenities.includes('wifi') && <Wifi color="#9CA3AF" size={12} />}
          {room.amenities.includes('coffee') && <Coffee color="#9CA3AF" size={12} />}
          {room.amenities.includes('parking') && <Car color="#9CA3AF" size={12} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function RoomDetailsModal({ room, onClose }: { room: any; onClose: () => void }) {
  const StatusIcon = getRoomStatusIcon(room.status);
  const statusColor = getRoomStatusColor(room.status);

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Room {room.number}</Text>
          <TouchableOpacity onPress={onClose}>
            <XCircle color="#9CA3AF" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.roomDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>{room.type}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusContainer}>
              <StatusIcon color={statusColor} size={16} />
              <Text style={[styles.detailValue, { color: statusColor }]}>
                {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>${room.price}/night</Text>
          </View>

          {room.guest && (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Guest</Text>
                <Text style={styles.detailValue}>{room.guest}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Check-out</Text>
                <Text style={styles.detailValue}>{room.checkOut}</Text>
              </View>
            </>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Cleaned</Text>
            <Text style={styles.detailValue}>{room.lastCleaned}</Text>
          </View>
        </View>

        <View style={styles.modalActions}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#059669' }]}>
            <Text style={styles.actionButtonText}>Check In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}>
            <Text style={styles.actionButtonText}>Mark Clean</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.actionButtonText}>Maintenance</Text>
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
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statusCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 12,
    left: 12,
  },
  statusCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statusTitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabs: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#1E293B',
  },
  filterTabActive: {
    backgroundColor: '#059669',
  },
  filterTabText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: '#ffffff',
  },
  roomsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 40,
  },
  roomCard: {
    width: '48%',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  roomNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomType: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  roomStatus: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  guestInfo: {
    marginBottom: 12,
  },
  guestName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  checkOutDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
  amenities: {
    flexDirection: 'row',
    gap: 6,
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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  roomDetails: {
    gap: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
