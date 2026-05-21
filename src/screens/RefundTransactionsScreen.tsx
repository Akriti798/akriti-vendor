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

const RefundCard = () => {
  return (
    <View style={styles.refundCardContainer}>
      <View style={styles.refundCardTopRow}>
        <View style={styles.refundCardLeft}>
          <View style={styles.refundIconContainerSmall}>
            <Text style={styles.refundIconSmall}>🔄</Text>
          </View>
          <View style={styles.refundTextColumn}>
            <Text style={styles.refundTitle}>Refund-Order #10563</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
            <Text style={styles.refundDate}>Apr 24,2026</Text>
          </View>
        </View>

        <View style={styles.refundCardRight}>
          <Text style={styles.refundAmountText}>-₹1,499</Text>
          <TouchableOpacity style={styles.viewDetailButton}>
            <Text style={styles.viewDetailText}>View Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function RefundTransactionsScreen() {
  const [activeTab, setActiveTab] = useState('Refunds');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.topFadedTitle}>REFUND</Text>

        <View style={styles.mainContainer}>
          {/* Top Section */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/42' }}
              style={styles.logo}
            />
          </View>

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.hamburgerIcon}>☰</Text>
            </TouchableOpacity>
          </View>

          {/* Segmented Filter Tab Bar */}
          <View style={styles.tabContainer}>
            {['All', 'Withdrawals', 'Earnings', 'Refunds'].map((tab, index) => {
              const isActive = activeTab === tab;
              const isLast = index === 3;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tabItem,
                    isActive ? styles.activeTabItem : styles.inactiveTabItem,
                    !isLast && styles.tabBorderRight,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      isActive ? styles.activeTabText : styles.inactiveTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Total Refunds Card */}
          <View style={styles.totalRefundsCard}>
            <View style={styles.totalRefundsLeft}>
              <View style={styles.refundIconContainer}>
                <Text style={styles.refundIconLarge}>🔄</Text>
              </View>
              <View style={styles.totalTextColumn}>
                <Text style={styles.totalAmount}>₹1,499</Text>
                <Text style={styles.totalSubtitle}>Total Refunds</Text>
              </View>
            </View>
            <Text style={styles.greyArrowIcon}>{'>'}</Text>
          </View>

          {/* Refund Transaction Cards */}
          <RefundCard />
          <RefundCard />
          <RefundCard />
          <RefundCard />

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
    fontWeight: '500',
  },
  mainContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
    marginHorizontal: 12,
    marginTop: 10,
    padding: 16,
    flex: 1,
    minHeight: '90%',
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  hamburgerIcon: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  tabContainer: {
    marginTop: 20,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  activeTabItem: {
    backgroundColor: '#F5A623',
  },
  inactiveTabItem: {
    backgroundColor: '#F8F8F8',
  },
  tabText: {
    fontSize: 12,
  },
  activeTabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#555',
  },
  totalRefundsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalRefundsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refundIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refundIconLarge: {
    fontSize: 24,
    color: '#27C7C7',
  },
  totalTextColumn: {
    marginLeft: 12,
  },
  totalAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  totalSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555',
  },
  greyArrowIcon: {
    fontSize: 24,
    color: '#CFCFCF',
    fontWeight: 'bold',
  },
  refundCardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 14,
    marginTop: 16,
  },
  refundCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  refundCardLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  refundIconContainerSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refundIconSmall: {
    fontSize: 20,
    color: '#27C7C7',
  },
  refundTextColumn: {
    marginLeft: 10,
    flex: 1,
  },
  refundTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  statusBadge: {
    backgroundColor: '#D7F5DD',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#1E8E3E',
    fontSize: 11,
    fontWeight: 'bold',
  },
  refundDate: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  refundCardRight: {
    alignItems: 'flex-end',
  },
  refundAmountText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewDetailButton: {
    backgroundColor: '#FFE1C2',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 20,
  },
  viewDetailText: {
    color: '#F57C00',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
