import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function WithdrawScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.topFadedTitle}>Withdraw</Text>

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
              <Text style={styles.headerTitle}>Withdraw</Text>
            </View>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://via.placeholder.com/42' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>

          {/* Available Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.walletIconContainer}>
              <Text style={styles.walletIcon}>👝</Text>
            </View>
            <View style={styles.balanceRight}>
              <Text style={styles.amountText}>₹24,750</Text>
              <Text style={styles.subtitleText}>Available Balance</Text>
            </View>
          </View>

          {/* Withdraw Amount Section */}
          <Text style={styles.sectionTitle}>Withdraw Amount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Amount"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* Bank Account Section */}
          <Text style={styles.sectionTitle}>Bank Account</Text>
          <View style={styles.bankCard}>
            <View style={styles.bankCardLeft}>
              <View style={styles.bankIconContainer}>
                <Text style={styles.bankIcon}>🏦</Text>
              </View>
              <View style={styles.bankTextColumn}>
                <Text style={styles.accountName}>AMIT PATEL</Text>
                <Text style={styles.maskedAccount}>****1234</Text>
                <Text style={styles.branchName}>SBI Delhi Branch</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Withdrawal Info Text */}
          <Text style={styles.infoText}>
            Withdrawals are processed within 1-2 business days.
          </Text>

          {/* Withdraw Button */}
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>

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
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#333',
    padding: 18,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletIconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletIcon: {
    fontSize: 32,
  },
  balanceRight: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#555',
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 25,
    marginBottom: 12,
  },
  inputContainer: {
    height: 55,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  rupeeSymbol: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555',
  },
  textInput: {
    fontSize: 20,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    height: '100%',
  },
  bankCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bankCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankIconContainer: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankIcon: {
    fontSize: 28,
    color: '#2196F3',
  },
  bankTextColumn: {
    marginLeft: 12,
  },
  accountName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  maskedAccount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  branchName: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#FFE1C2',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    color: '#F57C00',
    fontSize: 13,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
    marginTop: 14,
  },
  withdrawButton: {
    backgroundColor: '#FF8A00',
    height: 55,
    borderRadius: 14,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withdrawButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
