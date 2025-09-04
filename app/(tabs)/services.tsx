import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Coffee,
  Car,
  Utensils,
  Shirt,
  Wifi,
  MapPin,
  Bell,
  Plus,
  Clock,
  DollarSign,
  CheckCircle,
  X,
  Phone,
} from 'lucide-react-native';

export default function ServicesScreen() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('requests');

  const serviceRequests = [
    {
      id: 1,
      room: '203',
      guest: 'John Smith',
      service: 'Room Service',
      details: 'Continental breakfast for 2',
      time: '8:30 AM',
      status: 'pending',
      priority: 'normal',
      estimatedTime: '30 mins',
      amount: 45.00,
    },
    {
      id: 2,
      room: '105',
      guest: 'Sarah Johnson',
      service: 'Housekeeping',
      details: 'Extra towels and bed sheets',
      time: '10:15 AM',
      status: 'in-progress',
      priority: 'normal',
      estimatedTime: '15 mins',
      amount: 0,
    },
    {
      id: 3,
      room: '308',
      guest: 'Mike Chen',
      service: 'Laundry',
      details: '2 shirts, 1 pair of pants',
      time: '2:45 PM',
      status: 'completed',
      priority: 'low',
      estimatedTime: '2 hours',
      amount: 25.00,
    },
    {
      id: 4,
      room: '201',
      guest: 'Emily Davis',
      service: 'Concierge',
      details: 'Restaurant reservation for 7 PM',
      time: '4:20 PM',
      status: 'pending',
      priority: 'high',
      estimatedTime: '10 mins',
      amount: 0,
    },
  ];

  const availableServices = [
    {
      name: 'Room Service',
      icon: Utensils,
      color: '#F59E0B',
      description: 'Food and beverage delivery',
      basePrice: 15,
    },
    {
      name: 'Housekeeping',
      icon: Bell,
      color: '#10B981',
      description: 'Room cleaning and maintenance',
      basePrice: 0,
    },
    {
      name: 'Laundry',
      icon: Shirt,
      color: '#3B82F6',
      description: 'Washing and dry cleaning',
      basePrice: 20,
    },
    {
      name: 'Concierge',
      icon: MapPin,
      color: '#8B5CF6',
      description: 'Local recommendations and bookings',
      basePrice: 0,
    },
    {
      name: 'Parking',
      icon: Car,
      color: '#EF4444',
      description: 'Valet parking service',
      basePrice: 25,
    },
    {
      name: 'WiFi Support',
      icon: Wifi,
      color: '#6B7280',
      description: 'Technical assistance',
      basePrice: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'in-progress':
        return '#3B82F6';
      case 'completed':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'normal':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const filteredRequests = serviceRequests.filter(request => {
    if (activeTab === 'pending') return request.status === 'pending';
    if (activeTab === 'active') return request.status === 'in-progress';
    if (activeTab === 'completed') return request.status === 'completed';
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Guest Services</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowRequestModal(true)}
        >
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <StatCard
          title="Pending"
          count={serviceRequests.filter(r => r.status === 'pending').length}
          color="#F59E0B"
        />
        <StatCard
          title="In Progress"
          count={serviceRequests.filter(r => r.status === 'in-progress').length}
          color="#3B82F6"
        />
        <StatCard
          title="Completed"
          count={serviceRequests.filter(r => r.status === 'completed').length}
          color="#10B981"
        />
        <StatCard
          title="Revenue"
          count={`$${serviceRequests.reduce((sum, r) => sum + r.amount, 0)}`}
          color="#8B5CF6"
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['requests', 'pending', 'active', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Service Requests List */}
      <ScrollView style={styles.requestsList}>
        {filteredRequests.map((request) => (
          <ServiceRequestCard
            key={request.id}
            request={request}
            onPress={() => {
              setSelectedService(request);
              setShowRequestModal(true);
            }}
          />
        ))}
      </ScrollView>

      {/* Service Request Modal */}
      <Modal
        visible={showRequestModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRequestModal(false)}
      >
        <ServiceRequestModal
          request={selectedService}
          services={availableServices}
          onClose={() => {
            setShowRequestModal(false);
            setSelectedService(null);
          }}
        />
      </Modal>
    </View>
  );
}

function StatCard({ title, count, color }: {
  title: string;
  count: string | number;
  color: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIndicator, { backgroundColor: color }]} />
      <Text style={styles.statCount}>{count}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function ServiceRequestCard({ request, onPress }: { request: any; onPress: () => void }) {
  const statusColor = getStatusColor(request.status);
  const priorityColor = getPriorityColor(request.priority);

  return (
    <TouchableOpacity style={styles.requestCard} onPress={onPress}>
      <View style={styles.requestHeader}>
        <View style={styles.requestInfo}>
          <Text style={styles.roomNumber}>Room {request.room}</Text>
          <Text style={styles.guestName}>{request.guest}</Text>
        </View>
        <View style={styles.requestMeta}>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
            <Text style={styles.priorityText}>{request.priority.toUpperCase()}</Text>
          </View>
          <Text style={styles.requestTime}>{request.time}</Text>
        </View>
      </View>

      <View style={styles.requestContent}>
        <Text style={styles.serviceName}>{request.service}</Text>
        <Text style={styles.serviceDetails}>{request.details}</Text>
      </View>

      <View style={styles.requestFooter}>
        <View style={styles.requestStatus}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{request.status.toUpperCase()}</Text>
          </View>
          <View style={styles.timeInfo}>
            <Clock color="#9CA3AF" size={14} />
            <Text style={styles.estimatedTime}>{request.estimatedTime}</Text>
          </View>
        </View>
        {request.amount > 0 && (
          <View style={styles.amountInfo}>
            <DollarSign color="#10B981" size={16} />
            <Text style={styles.amount}>${request.amount.toFixed(2)}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function ServiceRequestModal({ request, services, onClose }: {
  request: any;
  services: any[];
  onClose: () => void;
}) {
  const [newRequest, setNewRequest] = useState({
    room: '',
    service: '',
    details: '',
    priority: 'normal',
  });

  const isNewRequest = !request;

  const handleSubmit = () => {
    if (isNewRequest) {
      if (!newRequest.room || !newRequest.service || !newRequest.details) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }
      Alert.alert('Success', 'Service request created successfully!');
    } else {
      Alert.alert('Success', 'Service request updated successfully!');
    }
    onClose();
  };

  const updateStatus = (status: string) => {
    Alert.alert('Update Status', `Mark as ${status}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', onPress: onClose },
    ]);
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {isNewRequest ? 'New Service Request' : 'Service Request Details'}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X color="#9CA3AF" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalBody}>
          {isNewRequest ? (
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Available Services</Text>
              <View style={styles.servicesGrid}>
                {services.map((service, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.serviceOption,
                      newRequest.service === service.name && styles.serviceSelected,
                    ]}
                    onPress={() => setNewRequest({ ...newRequest, service: service.name })}
                  >
                    <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                      <service.icon color="#ffffff" size={20} />
                    </View>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.servicePrice}>
                      {service.basePrice > 0 ? `$${service.basePrice}+` : 'Free'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Room number"
                placeholderTextColor="#9CA3AF"
                value={newRequest.room}
                onChangeText={(room) => setNewRequest({ ...newRequest, room })}
              />

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Service details..."
                placeholderTextColor="#9CA3AF"
                value={newRequest.details}
                onChangeText={(details) => setNewRequest({ ...newRequest, details })}
                multiline
                numberOfLines={4}
              />

              <View style={styles.priorityContainer}>
                <Text style={styles.inputLabel}>Priority</Text>
                <View style={styles.priorityOptions}>
                  {['low', 'normal', 'high'].map((priority) => (
                    <TouchableOpacity
                      key={priority}
                      style={[
                        styles.priorityOption,
                        newRequest.priority === priority && styles.prioritySelected,
                      ]}
                      onPress={() => setNewRequest({ ...newRequest, priority })}
                    >
                      <Text
                        style={[
                          styles.priorityOptionText,
                          newRequest.priority === priority && styles.prioritySelectedText,
                        ]}
                      >
                        {priority.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.requestDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Room:</Text>
                <Text style={styles.detailValue}>{request.room}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Guest:</Text>
                <Text style={styles.detailValue}>{request.guest}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Service:</Text>
                <Text style={styles.detailValue}>{request.service}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Details:</Text>
                <Text style={styles.detailValue}>{request.details}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status:</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
                  <Text style={styles.statusText}>{request.status.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount:</Text>
                <Text style={styles.detailValue}>
                  {request.amount > 0 ? `$${request.amount.toFixed(2)}` : 'Free'}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.modalActions}>
          {isNewRequest ? (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#059669' }]} onPress={handleSubmit}>
              <Text style={styles.actionButtonText}>Create Request</Text>
            </TouchableOpacity>
          ) : (
            <>
              {request.status === 'pending' && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
                  onPress={() => updateStatus('in-progress')}
                >
                  <Text style={styles.actionButtonText}>Start</Text>
                </TouchableOpacity>
              )}
              {request.status === 'in-progress' && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#10B981' }]}
                  onPress={() => updateStatus('completed')}
                >
                  <CheckCircle color="#ffffff" size={20} />
                  <Text style={styles.actionButtonText}>Complete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6B7280' }]}>
                <Phone color="#ffffff" size={20} />
                <Text style={styles.actionButtonText}>Call Guest</Text>
              </TouchableOpacity>
            </>
          )}
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
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    position: 'relative',
  },
  statIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  statCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#059669',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  requestsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  requestCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  requestInfo: {
    flex: 1,
  },
  roomNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  guestName: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  requestMeta: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  requestTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  requestContent: {
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  serviceDetails: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  estimatedTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  amountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
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
    maxHeight: '90%',
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
  modalBody: {
    flex: 1,
  },
  formContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  serviceOption: {
    width: '30%',
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  serviceSelected: {
    backgroundColor: '#059669',
  },
  serviceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  input: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  priorityContainer: {
    marginTop: 8,
  },
  priorityOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#374151',
    alignItems: 'center',
  },
  prioritySelected: {
    backgroundColor: '#059669',
  },
  priorityOptionText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  prioritySelectedText: {
    color: '#ffffff',
  },
  requestDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
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
