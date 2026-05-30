import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VendorBankDetails'>;

const ACCOUNT_TYPES = ['Savings', 'Current', 'Salary', 'Fixed Deposit', 'NRI Account'];

const VendorBankDetailsScreen: React.FC<Props> = ({ navigation }) => {
    const [accountType, setAccountType] = useState('Savings');
    const [showAccountTypeDropdown, setShowAccountTypeDropdown] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {/* Top Header Text */}
                <Text style={styles.topFadedText}>Bank Detail</Text>

                {/* Seller Hub Header Card */}
                <View style={styles.sellerHubCard}>
                    <View>
                        <Text style={styles.sellerHubTitle}>Seller hub</Text>
                        <Text style={styles.sellerHubSubtitle}>by FROOKOON</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <View style={styles.helpIcon}>
                            <Text style={styles.helpText}>?</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.profileImage}
                        />
                    </View>
                </View>

                {/* Step Progress Bar */}
                <View style={styles.progressBar}>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle}>
                            <View style={styles.innerCircleInactive} />
                        </View>
                        <Text style={styles.stepLabel}>Business details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle}>
                            <View style={styles.innerCircleInactive} />
                        </View>
                        <Text style={styles.stepLabel}>Seller details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                    <View style={styles.stepContainer}>
                        <View style={[styles.stepCircle, styles.stepCircleActive]}>
                            <View style={styles.innerCircleActive} />
                        </View>
                        <Text style={styles.stepLabel}>Bank details</Text>
                    </View>
                </View>

                {/* Bank Details Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Bank details</Text>
                    <Text style={styles.sectionSubtitle}>
                        Enter your bank account information for payments
                    </Text>
                </View>

                {/* Form Fields Section */}
                <View style={styles.formContainer}>
                    {/* Account Holder Name */}
                    <Text style={styles.fieldLabel}>
                        Account Holder Name<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter full name as per bank"
                            placeholderTextColor="#888"
                            style={styles.textInput}
                        />
                    </View>

                    {/* Bank Name */}
                    <Text style={styles.fieldLabel}>
                        Bank Name<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter account number"
                            placeholderTextColor="#888"
                            style={styles.textInput}
                        />
                    </View>

                    {/* Re-enter Account Number */}
                    <Text style={styles.fieldLabel}>
                        Enter Account Number<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Confirm account number"
                            placeholderTextColor="#888"
                            style={styles.textInput}
                        />
                    </View>

                    {/* Double Field Row (IFSC & Account Type) */}
                    <View style={styles.doubleFieldRow}>
                        <View style={styles.fieldHalf}>
                            <Text style={styles.fieldLabel}>
                                IFSC Code<Text style={styles.required}>*</Text>
                            </Text>
                            <View style={styles.inputBox}>
                                <TextInput
                                    placeholder="Enter IFSC code"
                                    placeholderTextColor="#888"
                                    style={styles.textInput}
                                />
                            </View>
                        </View>

                        {/* Account Type Dropdown */}
                        <View style={[styles.fieldHalf, styles.dropdownWrapper]}>
                            <Text style={styles.fieldLabel}>
                                Account Type<Text style={styles.required}>*</Text>
                            </Text>
                            <TouchableOpacity
                                style={[styles.inputBox, styles.dropdownBox]}
                                onPress={() => setShowAccountTypeDropdown(!showAccountTypeDropdown)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.dropdownPlaceholder}>{accountType}</Text>
                                <Text style={styles.arrowDown}>
                                    {showAccountTypeDropdown ? '▲' : '▼'}
                                </Text>
                            </TouchableOpacity>

                            {showAccountTypeDropdown && (
                                <View style={styles.dropdownList}>
                                    {ACCOUNT_TYPES.map((type) => (
                                        <TouchableOpacity
                                            key={type}
                                            style={[
                                                styles.dropdownOption,
                                                accountType === type && styles.dropdownOptionSelected,
                                            ]}
                                            onPress={() => {
                                                setAccountType(type);
                                                setShowAccountTypeDropdown(false);
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.dropdownOptionText,
                                                    accountType === type && styles.dropdownOptionTextSelected,
                                                ]}
                                            >
                                                {type}
                                            </Text>
                                            {accountType === type && (
                                                <Text style={styles.dropdownCheckmark}>✓</Text>
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Branch Name */}
                    <Text style={styles.fieldLabel}>
                        Branch Name<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter branch name"
                            placeholderTextColor="#888"
                            style={styles.textInput}
                        />
                    </View>

                    {/* UPI ID (Optional) */}
                    <Text style={styles.fieldLabel}>
                        UPI ID<Text style={styles.required}>*</Text>
                        <Text style={styles.optionalText}>(Optional)</Text>
                    </Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter UPI ID"
                            placeholderTextColor="#888"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => navigation.navigate('VendorBrandDetails')}
                >
                    <Text style={styles.saveButtonText}>Save & continue</Text>
                </TouchableOpacity>

                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    topFadedText: {
        fontSize: 14,
        color: '#BDBDBD',
        marginLeft: 16,
        marginTop: 10,
    },
    sellerHubCard: {
        backgroundColor: '#E6C16A',
        height: 70,
        borderRadius: 6,
        marginHorizontal: 16,
        marginTop: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sellerHubTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    sellerHubSubtitle: {
        fontSize: 10,
        color: '#333',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    helpIcon: {
        width: 24,
        height: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpText: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 10,
        backgroundColor: '#CCC',
    },
    progressBar: {
        backgroundColor: '#EAEAEA',
        marginHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
    },
    stepContainer: {
        alignItems: 'center',
        flex: 1,
    },
    stepCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#999',
        backgroundColor: '#FFF',
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepCircleActive: {
        borderColor: '#4CAF50',
    },
    innerCircleActive: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4CAF50',
    },
    innerCircleInactive: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#999',
    },
    stepLabel: {
        fontSize: 10,
        color: '#333',
        textAlign: 'center',
    },
    arrowIcon: {
        fontSize: 14,
        color: '#999',
        marginHorizontal: 5,
    },
    sectionContainer: {
        marginHorizontal: 16,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    sectionSubtitle: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    formContainer: {
        marginHorizontal: 16,
    },
    fieldLabel: {
        fontSize: 14,
        color: '#000',
        marginTop: 15,
        fontWeight: '500',
    },
    required: {
        color: '#D32F2F',
    },
    optionalText: {
        color: '#888',
        fontSize: 12,
        fontWeight: 'normal',
    },
    inputBox: {
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        paddingHorizontal: 12,
        marginTop: 8,
        justifyContent: 'center',
    },
    dropdownBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        padding: 0,
    },
    dropdownPlaceholder: {
        fontSize: 14,
        color: '#000',
    },
    arrowDown: {
        fontSize: 10,
        color: '#000',
    },
    doubleFieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
    },
    fieldHalf: {
        width: '48%',
    },
    dropdownWrapper: {
        zIndex: 999,
    },
    dropdownList: {
        position: 'absolute',
        top: 75,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        zIndex: 999,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        overflow: 'hidden',
    },
    dropdownOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 11,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    dropdownOptionSelected: {
        backgroundColor: '#F1F8F1',
    },
    dropdownOptionText: {
        fontSize: 13,
        color: '#333',
    },
    dropdownOptionTextSelected: {
        color: '#2E7D32',
        fontWeight: '600',
    },
    dropdownCheckmark: {
        fontSize: 13,
        color: '#2E7D32',
        fontWeight: '700',
    },
    saveButton: {
        backgroundColor: '#000',
        height: 52,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginHorizontal: 40,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VendorBankDetailsScreen;