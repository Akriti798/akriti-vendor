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

type Props = NativeStackScreenProps<RootStackParamList, 'VendorBusinessDetails'>;

const VendorBusinessDetailsScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Top Header Text */}
                <Text style={styles.topFadedText}>Detail</Text>

                {/* Seller Hub Header Card */}
                <View style={styles.sellerHubCard}>
                    <View>
                        <Text style={styles.sellerHubTitle}>Seller hub</Text>
                        <Text style={styles.sellerHubSubtitle}>BY FROOKOON</Text>
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
                        <View style={[styles.stepCircle, styles.stepCircleActive]}>
                            <View style={styles.innerCircleActive} />
                        </View>
                        <Text style={styles.stepLabel}>Business details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle} />
                        <Text style={styles.stepLabel}>Seller details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle} />
                        <Text style={styles.stepLabel}>Bank details</Text>
                    </View>
                </View>

                {/* Business Details Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Busines details</Text>
                    <Text style={styles.sectionSubtitle}>
                        Enter the detail about your product and sales
                    </Text>
                </View>

                {/* Category Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.fieldLabel}>Category & sales details *</Text>
                    <Text style={styles.fieldSubLabel}>Top Category for your product (Upto 10) *</Text>
                    
                    <TouchableOpacity 
                        style={styles.addCategoryBox}
                        onPress={() => navigation.navigate('VendorCategorySelection')}
                    >
                        <Text style={styles.addCategoryText}>+ Tap to add a category</Text>
                    </TouchableOpacity>
                </View>

                {/* Retail Channel Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.channelTitle}>Select your retail channels</Text>
                    
                    <View style={styles.channelCard}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.floatingLabel}>Retail chanel *</Text>
                            <View style={styles.dropdownBox}>
                                <Text style={styles.placeholderText}>Select</Text>
                                <Text style={styles.arrowDown}>▼</Text>
                            </View>
                        </View>

                        <View style={styles.inputBoxGrey}>
                            <TextInput
                                placeholder="Reference link"
                                placeholderTextColor="#888"
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.dropdownBox}>
                                <Text style={styles.placeholderText}>Total monthy sales *</Text>
                                <Text style={styles.arrowDown}>▼</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => navigation.navigate('VendorSellerDetails')}
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
        marginTop: 10,
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
        padding: 10,
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
    },
    stepCircleActive: {
        borderColor: '#2E7D32',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircleActive: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#2E7D32',
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
        marginTop: 15,
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
        fontWeight: '500',
        color: '#000',
        marginTop: 15,
    },
    fieldSubLabel: {
        fontSize: 12,
        color: '#444',
        marginTop: 5,
    },
    addCategoryBox: {
        backgroundColor: '#E9E6CF',
        height: 70,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    addCategoryText: {
        color: '#2E7D32',
        fontSize: 14,
        fontWeight: '500',
    },
    channelTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        marginTop: 20,
    },
    channelCard: {
        backgroundColor: '#E9E6CF',
        borderRadius: 20,
        padding: 15,
        marginTop: 10,
    },
    inputWrapper: {
        marginTop: 10,
    },
    floatingLabel: {
        fontSize: 10,
        color: '#FF0000',
        position: 'absolute',
        top: -6,
        left: 10,
        zIndex: 1,
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 2,
    },
    dropdownBox: {
        height: 45,
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    placeholderText: {
        fontSize: 14,
        color: '#888',
    },
    arrowDown: {
        fontSize: 12,
        color: '#000',
    },
    inputBoxGrey: {
        height: 45,
        backgroundColor: '#DCDCDC',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'center',
    },
    textInput: {
        fontSize: 14,
        color: '#000',
        padding: 0,
    },
    saveButton: {
        backgroundColor: '#000',
        height: 50,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginHorizontal: 40,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VendorBusinessDetailsScreen;
