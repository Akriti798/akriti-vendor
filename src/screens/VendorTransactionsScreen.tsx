import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TransactionCard = ({
  icon,
  title,
  amount,
  status,
  date,
  isPositive,
}: {
  icon: string;
  title: string;
  amount: string;
  status: string;
  date?: string;
  isPositive: boolean;
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTopRow}>
        <View style={styles.cardLeft}>
          <View style={styles.cardIconWrapper}>
            <Text style={styles.cardIconEmoji}>{icon}</Text>
          </View>
          <View style={styles.cardTextCol}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
            {date && <Text style={styles.cardDate}>{date}</Text>}
          </View>
        </View>

        <View style={styles.cardRight}>
          <Text
            style={[
              styles.amountText,
              { color: isPositive ? '#1E8E3E' : '#D32F2F' },
            ]}>
            {amount}
          </Text>
          <TouchableOpacity style={styles.viewDetailButton}>
            <Text style={styles.viewDetailText}>View Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function VendorTransactionsScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const navigation = useNavigation();

  const tabs = ['All', 'Withdrawals', 'Earnings', 'Refunds'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.topHeaderText}>Transactions</Text>

      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Top Section */}
          <View style={styles.logoCircle}>
            <Image 
              source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }} 
              style={{ width: 45, height: 45, borderRadius: 22.5 }} 
              resizeMode="cover"
            />
          </View>

          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Transactions</Text>
            </View>
            <View style={styles.profileCircle}>
              <Text style={styles.profileIcon}>👨🏽</Text>
            </View>
          </View>

          {/* Segmented Tab Bar */}
          <View style={styles.tabContainer}>
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab;
              const isLast = index === tabs.length - 1;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tabItem,
                    isActive ? styles.tabItemActive : styles.tabItemInactive,
                    !isLast && styles.tabBorderRight,
                  ]}>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={[
                      styles.tabText,
                      isActive
                        ? styles.tabTextActive
                        : styles.tabTextInactive,
                    ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Available Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceLeft}>
              <View style={styles.balanceIconWrapper}>
                <Text style={styles.balanceIconEmoji}>💼</Text>
              </View>
              <View style={styles.balanceCenter}>
                <Text style={styles.balanceAmount}>₹ 24,750</Text>
                <Text style={styles.balanceSubtitle}>Available Balance</Text>
              </View>
            </View>
            <Text style={styles.balanceArrow}>{'>'}</Text>
          </View>

          {/* Transaction Cards */}
          <TransactionCard
            icon="💼"
            title="Withdrawal to SBI ****4567"
            amount="-₹24,750"
            status="Completed"
            date="Apr 24,2026"
            isPositive={false}
          />
          <TransactionCard
            icon="📦"
            title="Product Sale"
            amount="+₹6,098"
            status="Completed"
            isPositive={true}
          />
          <TransactionCard
            icon="🔄"
            title="Refund-Order #10563"
            amount="-₹1,499"
            status="Completed"
            isPositive={false}
          />
          <TransactionCard
            icon="📦"
            title="Product Sale"
            amount="+₹6,098"
            status="Completed"
            isPositive={true}
          />
        </ScrollView>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  topHeaderText: {
    fontSize: 14,
    color: '#BDBDBD',
    marginLeft: 16,
    marginTop: 10,
  },
  mainContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    marginHorizontal: 12,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  logoCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F5DEB3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
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
  backButton: {
    marginRight: 10,
  },
  backArrow: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  profileCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileIcon: {
    fontSize: 24,
  },
  tabContainer: {
    marginTop: 20,
    height: 45,
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
  tabItemActive: {
    backgroundColor: '#F5A623',
  },
  tabItemInactive: {
    backgroundColor: '#F7F7F7',
  },
  tabText: {
    fontSize: 11,
  },
  tabTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#555',
    fontWeight: 'normal',
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceIconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginRight: 12,
  },
  balanceIconEmoji: {
    fontSize: 20,
  },
  balanceCenter: {
    flexDirection: 'column',
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  balanceSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  balanceArrow: {
    fontSize: 20,
    color: '#CCC',
    fontWeight: '600',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  cardIconWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  cardIconEmoji: {
    fontSize: 20,
  },
  cardTextCol: {
    marginLeft: 10,
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  statusBadge: {
    backgroundColor: '#D7F5DD',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  statusText: {
    color: '#1E8E3E',
    fontSize: 11,
    fontWeight: '600',
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minWidth: 70,
  },
  amountText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewDetailButton: {
    backgroundColor: '#FFE1C2',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },
  viewDetailText: {
    color: '#F57C00',
    fontSize: 11,
    fontWeight: '600',
  },

});
