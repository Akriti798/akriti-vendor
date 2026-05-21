import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function EarningDashboardScreen() {
  const [activeTab, setActiveTab] = useState('Today');

  const transactions = Array(5).fill({
    date: 'Apr 25,2026',
    orderId: '#100217',
    status: 'Complete',
    amount: '₹ 7,800',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.topFadedTitle}>Earning</Text>

        <View style={styles.mainContainer}>
          {/* Top Header Section */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/42' }}
              style={styles.logo}
            />
          </View>

          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <TouchableOpacity>
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Earning</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.bellIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Tab Bar */}
          <View style={styles.filterTabBar}>
            {['Today', 'This Week', 'This Month'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabItem,
                  activeTab === tab ? styles.activeTabItem : styles.inactiveTabItem,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab
                      ? styles.activeTabText
                      : styles.inactiveTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Total Earnings Card */}
          <View style={styles.totalEarningsCard}>
            <Text style={styles.totalEarningsTitle}>Total Earnings</Text>
            <View style={styles.amountRow}>
              <View style={styles.rupeeIconContainer}>
                <Text style={styles.rupeeIcon}>₹</Text>
              </View>
              <Text style={styles.amountText}>₹ 30,000</Text>
            </View>
          </View>

          {/* Sales & Earnings Section */}
          <View style={styles.sectionHeaderCard}>
            <Text style={styles.sectionHeaderText}>Sales & Earnings</Text>
          </View>

          {/* Chart Area */}
          <View style={styles.chartAreaContainer}>
            <Text style={styles.smallSectionTitle}>Sales & Earnings</Text>
            <View style={styles.chartBox}>
              <View style={styles.chartPlaceholder}>
                <Text style={styles.chartPlaceholderText}>
                  [ Line Graph Chart Area ]
                </Text>
              </View>
              <View style={styles.xAxisLabels}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <Text key={day} style={styles.axisLabelText}>
                    {day}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Transactions / Payouts Header */}
          <View style={styles.transactionsHeaderRow}>
            <TouchableOpacity>
              <Text style={styles.transactionsTab}>Transactions</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.payoutsTab}>Payouts</Text>
            </TouchableOpacity>
          </View>

          {/* Transaction Table */}
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Date</Text>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Order ID</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: 'center' }]}>
              Status
            </Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: 'right' }]}>
              Amount
            </Text>
          </View>

          <View style={styles.tableRowsContainer}>
            {transactions.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableRowText, { flex: 2 }]}>{item.date}</Text>
                <Text style={[styles.tableRowText, { flex: 2 }]}>{item.orderId}</Text>
                <View style={[styles.statusBadgeContainer, { flex: 1.5 }]}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
                <Text style={[styles.tableAmountText, { flex: 1.5 }]}>
                  {item.amount}
                </Text>
              </View>
            ))}
          </View>

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
    flexGrow: 1,
  },
  topFadedTitle: {
    fontSize: 14,
    color: '#BDBDBD',
    marginLeft: 16,
    marginTop: 10,
  },
  mainContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
    marginHorizontal: 12,
    marginTop: 10,
    padding: 16,
    flex: 1,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EAEAEA',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  bellIcon: {
    fontSize: 22,
    color: '#E67E22',
  },
  filterTabBar: {
    marginTop: 20,
    height: 42,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#F5A623',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabItem: {
    backgroundColor: '#F5A623',
  },
  inactiveTabItem: {
    backgroundColor: '#FAD7A0',
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#F57C00',
  },
  totalEarningsCard: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#333',
    padding: 16,
    marginTop: 25,
    flexDirection: 'column',
  },
  totalEarningsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rupeeIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5A623',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rupeeIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#444',
    marginLeft: 12,
  },
  sectionHeaderCard: {
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
  },
  chartAreaContainer: {
    marginTop: 20,
  },
  smallSectionTitle: {
    color: '#F5A623',
    fontSize: 15,
    fontWeight: '600',
  },
  chartBox: {
    height: 120,
    marginTop: 10,
    backgroundColor: '#FFF8F0',
    borderRadius: 8,
    padding: 10,
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#FAD7A0',
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: 'rgba(245, 166, 35, 0.1)',
  },
  chartPlaceholderText: {
    color: '#F5A623',
    fontSize: 12,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  axisLabelText: {
    fontSize: 10,
    color: '#999',
  },
  transactionsHeaderRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  transactionsTab: {
    color: '#D97706',
    fontWeight: 'bold',
    fontSize: 14,
  },
  payoutsTab: {
    color: '#777',
    marginLeft: 15,
    fontSize: 14,
  },
  tableHeaderRow: {
    backgroundColor: '#FDE7DF',
    height: 35,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  tableRowsContainer: {
    marginTop: 5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tableRowText: {
    fontSize: 12,
    color: '#333',
  },
  statusBadgeContainer: {
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: '#FFF1DD',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: '#F5A623',
    fontSize: 11,
  },
  tableAmountText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    textAlign: 'right',
  },
});
