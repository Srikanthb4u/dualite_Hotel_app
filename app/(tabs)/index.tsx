import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Users,
  Bed,
  DollarSign,
  Clock,
  UserCheck,
  UserX,
  AlertCircle,
  TrendingUp,
  Calendar,
  Bell,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning! 🌅</Text>
          <Text style={styles.subtitle}>{currentDate}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell color="#059669" size={24} />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <StatCard
          title="Occupancy"
          value="78%"
          subtitle="24/31 rooms"
          icon={Bed}
          color="#059669"
          trend="+5%"
        />
        <StatCard
          title="Check-ins"
          value="12"
          subtitle="Today"
          icon={UserCheck}
          color="#3B82F6"
          trend="+2"
        />
        <StatCard
          title="Revenue"
          value="$3.2K"
          subtitle="Today"
          icon={DollarSign}
          color="#F59E0B"
          trend="+8%"
        />
      </View>

      {/* Today's Overview */}
      <LinearGradient
        colors={['#059669', '#10B981']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overviewCard}
      >
        <View style={styles.overviewContent}>
          <Text style={styles.overviewTitle}>Today's Operations</Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewStat}>
              <UserCheck color="#ffffff" size={20} />
              <Text style={styles.overviewStatText}>8 Check-ins</Text>
            </View>
            <View style={styles.overviewStat}>
              <UserX color="#ffffff" size={20} />
              <Text style={styles.overviewStatText}>6 Check-outs</Text>
            </View>
            <View style={styles.overviewStat}>
              <Clock color="#ffffff" size={20} />
              <Text style={styles.overviewStatText}>4 Pending</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <ActionButton
            title="Check-in"
            subtitle="Guest arrival"
            icon={UserCheck}
            color="#059669"
          />
          <ActionButton
            title="Check-out"
            subtitle="Guest departure"
            icon={UserX}
            color="#3B82F6"
          />
          <ActionButton
            title="Room Status"
            subtitle="Update rooms"
            icon={Bed}
            color="#8B5CF6"
          />
          <ActionButton
            title="Services"
            subtitle="Guest requests"
            icon={Bell}
            color="#F59E0B"
          />
        </View>
      </View>

      {/* Upcoming Check-ins */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Check-ins</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CheckinCard
            guestName="Sarah Johnson"
            roomNumber="201"
            arrivalTime="2:00 PM"
            nights={3}
            color="#059669"
          />
          <CheckinCard
            guestName="Mike Chen"
            roomNumber="105"
            arrivalTime="3:30 PM"
            nights={2}
            color="#3B82F6"
          />
          <CheckinCard
            guestName="Emily Davis"
            roomNumber="308"
            arrivalTime="4:15 PM"
            nights={4}
            color="#8B5CF6"
          />
        </ScrollView>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityList}>
          <ActivityItem
            type="checkin"
            title="John Smith checked in"
            details="Room 203 • Premium Suite"
            time="15 mins ago"
            icon="🏨"
          />
          <ActivityItem
            type="service"
            title="Room service request"
            details="Room 106 • Continental Breakfast"
            time="32 mins ago"
            icon="🍽️"
          />
          <ActivityItem
            type="checkout"
            title="Lisa Williams checked out"
            details="Room 401 • 3 night stay"
            time="1 hour ago"
            icon="👋"
          />
        </View>
      </View>

      {/* Alerts */}
      <View style={styles.alertCard}>
        <View style={styles.alertIcon}>
          <AlertCircle color="#F59E0B" size={24} />
        </View>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>Maintenance Alert</Text>
          <Text style={styles.alertText}>
            Room 115 - Air conditioning repair scheduled for 2 PM
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color, trend }: {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  color: string;
  trend: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Icon color="#ffffff" size={20} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      <View style={styles.statFooter}>
        <Text style={styles.statSubtitle}>{subtitle}</Text>
        <Text style={[styles.statTrend, { color }]}>{trend}</Text>
      </View>
    </View>
  );
}

function ActionButton({ title, subtitle, icon: Icon, color }: {
  title: string;
  subtitle: string;
  icon: any;
  color: string;
}) {
  return (
    <TouchableOpacity style={styles.actionButton}>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Icon color="#ffffff" size={24} />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

function CheckinCard({ guestName, roomNumber, arrivalTime, nights, color }: {
  guestName: string;
  roomNumber: string;
  arrivalTime: string;
  nights: number;
  color: string;
}) {
  return (
    <View style={[styles.checkinCard, { borderLeftColor: color }]}>
      <View style={styles.checkinHeader}>
        <Text style={styles.guestName}>{guestName}</Text>
        <Text style={styles.roomNumber}>Room {roomNumber}</Text>
      </View>
      <Text style={styles.arrivalTime}>{arrivalTime}</Text>
      <Text style={styles.nightsStay}>{nights} nights</Text>
      <TouchableOpacity style={[styles.checkinButton, { backgroundColor: color }]}>
        <Text style={styles.checkinButtonText}>Prepare Room</Text>
      </TouchableOpacity>
    </View>
  );
}

function ActivityItem({ type, title, details, time, icon }: {
  type: 'checkin' | 'checkout' | 'service';
  title: string;
  details: string;
  time: string;
  icon: string;
}) {
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Text style={styles.activityEmoji}>{icon}</Text>
      </View>
      <View style={styles.activityDetails}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activitySubtitle}>{details}</Text>
        <Text style={styles.activityTime}>{time}</Text>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
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
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statSubtitle: {
    fontSize: 10,
    color: '#6B7280',
  },
  statTrend: {
    fontSize: 10,
    fontWeight: '600',
  },
  overviewCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  overviewContent: {
    zIndex: 1,
  },
  overviewTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  overviewStatText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  seeAll: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  actionSubtitle: {
    color: '#9CA3AF',
    fontSize: 10,
    textAlign: 'center',
  },
  checkinCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: width * 0.65,
    borderLeftWidth: 4,
  },
  checkinHeader: {
    marginBottom: 12,
  },
  guestName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roomNumber: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  arrivalTime: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  nightsStay: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 12,
  },
  checkinButton: {
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  checkinButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  activitySubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 2,
  },
  activityTime: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  alertIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 2,
  },
});
