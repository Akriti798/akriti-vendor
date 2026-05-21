import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';

const SettingRow = ({
  icon,
  iconBgColor,
  title,
  subtitle,
  rightElement,
  showDivider = true,
}: {
  icon: string;
  iconBgColor: string;
  title: string;
  subtitle: string;
  rightElement?: 'chevron' | 'switch';
  showDivider?: boolean;
}) => {
  return (
    <View>
      <View style={styles.rowContainer}>
        <View style={styles.rowLeft}>
          <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
            <Text style={styles.iconText}>{icon}</Text>
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.rowTitle}>{title}</Text>
            <Text style={styles.rowSubtitle}>{subtitle}</Text>
          </View>
        </View>

        <View style={styles.rowRight}>
          {rightElement === 'switch' ? (
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: '#d3d3d3', true: '#34C759' }}
              thumbColor="#fff"
            />
          ) : (
            <Text style={styles.chevronIcon}>{'>'}</Text>
          )}
        </View>
      </View>
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

export default function SettingsDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.topFadedTitle}>SETTING</Text>

        {/* Main Header Section */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTextColumn}>
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>
              Manage your store & account
            </Text>
          </View>
        </View>

        {/* Store Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileCardLeft}>
            <Image
              source={{ uri: 'https://via.placeholder.com/48' }}
              style={styles.storeLogo}
            />
            <View style={styles.profileTextColumn}>
              <Text style={styles.storeName}>GreenMart Grocery Store</Text>
              <Text style={styles.vendorId}>Vendor ID : VEND12345</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Group 1 */}
        <View style={styles.settingsGroup}>
          <SettingRow
            icon="👤"
            iconBgColor="#E6E6FA" // Light purple/blue
            title="Profile Settings"
            subtitle="Manage your personal information"
            rightElement="chevron"
          />
          <SettingRow
            icon="🏪"
            iconBgColor="#E3F2FD" // Light blue
            title="Store Settings"
            subtitle="Manage Store detail and preference"
            rightElement="chevron"
          />
          <SettingRow
            icon="💳"
            iconBgColor="#FFF3E0" // Light orange
            title="Payment & Bank Details"
            subtitle="Manage bank account and payment settings"
            rightElement="chevron"
            showDivider={false}
          />
        </View>

        {/* Settings Group 2 */}
        <View style={styles.settingsGroup}>
          <SettingRow
            icon="🔔"
            iconBgColor="#F3E5F5" // Light purple
            title="Notifications"
            subtitle="Manage notification preferences"
            rightElement="switch"
          />
          <SettingRow
            icon="🛡️"
            iconBgColor="#FFEBEE" // Light red
            title="Security"
            subtitle="Change password and security options"
            rightElement="chevron"
            showDivider={false}
          />
        </View>

        {/* Settings Group 3 */}
        <View style={styles.settingsGroup}>
          <SettingRow
            icon="🚚"
            iconBgColor="#E3F2FD" // Light blue
            title="Delivery & Shipping"
            subtitle="Manage delivery settings and charges"
            rightElement="chevron"
          />
          <SettingRow
            icon="🌐"
            iconBgColor="#E8F5E9" // Light green
            title="App Preferences"
            subtitle="Language, theme and other preferences"
            rightElement="chevron"
            showDivider={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  topFadedTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#BDBDBD',
    marginLeft: 16,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 25,
    marginHorizontal: 16,
  },
  backButton: {
    marginTop: 4,
  },
  backIcon: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  headerTextColumn: {
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginHorizontal: 16,
    marginTop: 30,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  storeLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEEEEE',
  },
  profileTextColumn: {
    marginLeft: 12,
    flex: 1,
  },
  storeName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  vendorId: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#D7FFD9',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginLeft: 10,
  },
  editButtonText: {
    color: '#14A800',
    fontSize: 13,
    fontWeight: 'bold',
  },
  settingsGroup: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginHorizontal: 16,
    marginTop: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  rowContainer: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  textColumn: {
    marginLeft: 14,
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  rowSubtitle: {
    fontSize: 11,
    color: '#777',
    marginTop: 4,
  },
  rowRight: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  chevronIcon: {
    fontSize: 20,
    color: '#CFCFCF',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 68,
  },
});
