import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type VendorProfileNavigationProp = NativeStackNavigationProp<
    any,
    'VendorProfile'
>;

interface Props {
    navigation: VendorProfileNavigationProp;
}

const VendorProfileScreen: React.FC<Props> = ({ navigation }) => {
    const renderQuickAction = (icon: string, label: string, onPress?: () => void) => (
        <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
            <View style={styles.quickActionIconContainer}>
                <Ionicons name={icon} size={28} color="#FF7A00" />
            </View>
            <Text style={styles.quickActionLabel}>{label}</Text>
        </TouchableOpacity>
    );

    const renderMenuItem = (icon: string, label: string, isLogout?: boolean) => (
        <TouchableOpacity style={styles.menuItemCard}>
            <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                    <Ionicons name={icon} size={24} color="#FF7A00" />
                </View>
                <Text style={styles.menuItemLabel}>{label}</Text>
            </View>
            <View style={styles.menuItemRight}>
                <Ionicons name="chevron-forward" size={20} color="#000" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.root}>
            {/* Top Faded Text */}
            <Text style={styles.topFadedText}>PROFILE</Text>

            {/* Header Row */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.circularButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.circularButton} onPress={() => navigation.navigate('SettingsDashboard')}>
                    <Ionicons name="settings-sharp" size={22} color="#FF7A00" />
                </TouchableOpacity>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.userName}>Amit Patel</Text>
                    <Text style={styles.userEmail}>amitpatel@gmail.com</Text>
                </View>

                {/* Quick Actions Row */}
                <View style={styles.quickActionsRow}>
                    {renderQuickAction('notifications', 'Notification')}
                    {renderQuickAction('business', 'Bank Details', () => navigation.navigate('VendorTransactions'))}
                    {renderQuickAction('time', 'History')}
                </View>

                {/* Menu List Section */}
                <View style={styles.menuSection}>
                    {renderMenuItem('person-circle-outline', 'Edit Profile')}
                    {renderMenuItem('storefront-outline', 'Store Information')}
                    {renderMenuItem('help-buoy-outline', 'Help & Support')}
                    {renderMenuItem('log-out-outline', 'Log Out')}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topFadedText: {
        fontSize: 14,
        color: '#BDBDBD',
        marginLeft: 16,
        marginTop: 10,
        fontWeight: '500',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 20,
    },
    circularButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
            },
            android: {
                elevation: 6,
            },
        }),
        marginBottom: 16,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF7A00',
    },
    userEmail: {
        fontSize: 14,
        color: '#000',
        marginTop: 4,
        fontWeight: '500',
    },
    quickActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    quickActionCard: {
        width: (width - 60) / 3,
        height: 85,
        backgroundColor: '#fff',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    quickActionIconContainer: {
        marginBottom: 6,
    },
    quickActionLabel: {
        fontSize: 10,
        color: '#333',
        fontWeight: 'bold',
    },
    menuSection: {
        gap: 15,
    },
    menuItemCard: {
        height: 65,
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItemLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
    },
    menuItemRight: {
        width: 34,
        height: 34,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default VendorProfileScreen;
