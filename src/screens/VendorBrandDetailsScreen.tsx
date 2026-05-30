import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VendorBrandDetails'>;

const VendorBrandDetailsScreen: React.FC<Props> = ({ navigation }) => {
    const infoRows = [
        { label: 'Brand ID:', value: '' },
        { label: 'Category:', value: '' },
        { label: 'Owner:', value: '' },
        { label: 'Email:', value: '' },
        { label: 'Phone:', value: '' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Top Header Text */}
                <Text style={styles.topFadedText}>brand detail</Text>

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
                        <Text style={styles.stepLabel}>Bank details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                    <View style={styles.stepContainer}>
                        <View style={[styles.stepCircle, styles.stepCircleActive]}>
                            <View style={styles.innerCircleActive} />
                        </View>
                        <Text style={styles.stepLabel}>brand details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle} />
                        <Text style={styles.stepLabel}>Shipping Location</Text>
                    </View>
                </View>

                {/* Brand Details Header */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.sectionTitle}>brand details</Text>
                        <Text style={styles.sectionSubtitle}>Enter brand of your business</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* Brand Card */}
                <View style={styles.brandCard}>
                    <View style={styles.brandLeft}>
                        <View style={styles.brandLogo}>
                             <Text style={styles.logoText}>Haldiram's</Text>
                        </View>
                        <View style={styles.brandInfoText}>
                            <Text style={styles.brandName}>Haldiram's</Text>
                            <Text style={styles.brandDate}>Created Jan 15,2021</Text>
                        </View>
                    </View>
                    <View style={styles.statusToggle}>
                        <Text style={styles.statusText}>Active</Text>
                        <View style={styles.toggleCircle} />
                    </View>
                </View>

                {/* Brand Information Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.cardTitle}>Brand Information</Text>
                    {infoRows.map((row, index) => (
                        <View key={index} style={styles.infoRow}>
                            <Text style={styles.infoLabel}>{row.label}</Text>
                            <View style={styles.placeholderBar} />
                        </View>
                    ))}
                </View>

                {/* Description Card */}
                <View style={styles.descriptionCard}>
                    <Text style={styles.cardTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        Premium quality product with trusted service
                    </Text>
                </View>

                {/* Save Button */}
                <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => navigation.navigate('VendorShippingLocation')}
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    editButton: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    editButtonText: {
        fontSize: 12,
        color: '#000',
    },
    brandCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 16,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    brandLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E53935',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    logoText: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    brandInfoText: {
        marginLeft: 10,
    },
    brandName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    brandDate: {
        fontSize: 10,
        color: '#777',
    },
    statusToggle: {
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        paddingHorizontal: 8,
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        marginRight: 4,
    },
    toggleCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'white',
    },
    infoCard: {
        backgroundColor: '#F7F7F7',
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 16,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 13,
        color: '#444',
    },
    placeholderBar: {
        width: 120,
        height: 10,
        backgroundColor: '#D0D0D0',
        borderRadius: 5,
    },
    descriptionCard: {
        backgroundColor: '#F7F7F7',
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 16,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    descriptionText: {
        fontSize: 12,
        color: '#444',
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

export default VendorBrandDetailsScreen;
