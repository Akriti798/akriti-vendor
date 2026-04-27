import React from 'react';
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

type Props = NativeStackScreenProps<RootStackParamList, 'VendorSellerDetails'>;

const VendorSellerDetailsScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Top Header Text */}
                <Text style={styles.topFadedText}>seller detail</Text>

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
                        <View style={[styles.stepCircle, styles.stepCircleActive]}>
                            <View style={styles.innerCircleActive} />
                        </View>
                        <Text style={styles.stepLabel}>Seller details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle} />
                        <Text style={styles.stepLabel}>Bank details</Text>
                    </View>
                </View>

                {/* Seller Details Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Seller details</Text>
                    <Text style={styles.sectionSubtitle}>
                        Enter the primary GST of your business
                    </Text>
                </View>

                {/* GST Details Input Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.fieldLabel}>GST details</Text>
                    <View style={styles.gstInputContainer}>
                        <TextInput
                            placeholder="Enter GST number *"
                            placeholderTextColor="#888"
                            style={styles.textInput}
                        />
                        <View style={styles.infoIcon}>
                            <Text style={styles.infoText}>i</Text>
                        </View>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => navigation.navigate('VendorBankDetails')}
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
    fieldLabel: {
        fontSize: 14,
        color: '#000',
        marginTop: 20,
        marginBottom: 8,
    },
    gstInputContainer: {
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        paddingHorizontal: 12,
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
    infoIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#000',
        height: 50,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginHorizontal: 40,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VendorSellerDetailsScreen;
