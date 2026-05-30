import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Switch,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VendorShippingLocation'>;

type Warehouse = {
    id: string;
    name: string;
    address: string;
    deliveryRadius: string;
    active: boolean;
};

// ── Custom Icons (no library needed) ──────────────────────────
const LocationIcon = ({ size = 14, color = '#fff' }: { size?: number; color?: string }) => (
    <View style={{ width: size, height: size + 2, alignItems: 'center' }}>
        {/* Circle top */}
        <View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
        }} />
        {/* Triangle bottom */}
        <View style={{
            width: 0,
            height: 0,
            borderLeftWidth: size / 2.5,
            borderRightWidth: size / 2.5,
            borderTopWidth: size / 2,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: color,
            marginTop: -1,
        }} />
    </View>
);

const PencilIcon = ({ size = 14, color = '#555' }: { size?: number; color?: string }) => (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
            width: size * 0.55,
            height: size * 0.85,
            borderWidth: 1.5,
            borderColor: color,
            borderRadius: 1,
            transform: [{ rotate: '-45deg' }],
        }} />
    </View>
);

const TrashIcon = ({ size = 14, color = '#E53935' }: { size?: number; color?: string }) => (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        {/* Lid */}
        <View style={{
            width: size * 0.85,
            height: 2,
            backgroundColor: color,
            borderRadius: 1,
            marginBottom: 1,
        }} />
        {/* Body */}
        <View style={{
            width: size * 0.7,
            height: size * 0.7,
            borderWidth: 1.5,
            borderColor: color,
            borderTopWidth: 0,
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
        }} />
    </View>
);

const ChevronIcon = ({ size = 14, color = '#999' }: { size?: number; color?: string }) => (
    <View style={{ width: size / 2, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
            width: size * 0.35,
            height: size * 0.35,
            borderTopWidth: 1.5,
            borderRightWidth: 1.5,
            borderColor: color,
            transform: [{ rotate: '45deg' }],
        }} />
    </View>
);

const ClockIcon = ({ size = 16, color = '#FF8C00' }: { size?: number; color?: string }) => (
    <View style={{
        width: size, height: size,
        borderRadius: size / 2,
        borderWidth: 1.5,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <View style={{ width: 1.5, height: size * 0.3, backgroundColor: color, position: 'absolute', top: size * 0.15 }} />
        <View style={{ width: size * 0.28, height: 1.5, backgroundColor: color, position: 'absolute', right: size * 0.18 }} />
    </View>
);

const TagIcon = ({ size = 16, color = '#FF8C00' }: { size?: number; color?: string }) => (
    <View style={{
        width: size, height: size,
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-45deg' }],
    }}>
        <View style={{
            width: 3, height: 3,
            borderRadius: 1.5,
            backgroundColor: color,
            position: 'absolute',
            top: 2, left: 2,
        }} />
    </View>
);

const StoreIcon = ({ size = 16, color = '#FF8C00' }: { size?: number; color?: string }) => (
    <View style={{ width: size, height: size, justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* Roof */}
        <View style={{
            width: 0, height: 0,
            borderLeftWidth: size / 2,
            borderRightWidth: size / 2,
            borderBottomWidth: size * 0.4,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: color,
            marginBottom: 1,
        }} />
        {/* Base */}
        <View style={{
            width: size * 0.75,
            height: size * 0.5,
            borderWidth: 1.5,
            borderColor: color,
            borderTopWidth: 0,
        }} />
    </View>
);
// ─────────────────────────────────────────────────────────────

const VendorShippingLocationScreen: React.FC<Props> = ({ navigation }) => {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([
        {
            id: '1',
            name: 'Warehouse Bhopal',
            address: 'Vijay Nagar, Indrapuri, Bhopal, Madhya Pradesh-462022',
            deliveryRadius: '3 km',
            active: true,
        },
        {
            id: '2',
            name: 'Central Warehouse',
            address: 'Vijay Nagar, Indrapuri, Bhopal, Madhya Pradesh-462022',
            deliveryRadius: '3 km',
            active: false,
        },
    ]);

    const toggleWarehouse = (id: string) => {
        setWarehouses(prev =>
            prev.map(w => w.id === id ? { ...w, active: !w.active } : w)
        );
    };

    const deleteWarehouse = (id: string) => {
        setWarehouses(prev => prev.filter(w => w.id !== id));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.topFadedText}>SHIPPING LOCATION</Text>

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
                        <View style={styles.stepCircle}>
                            <View style={styles.innerCircleInactive} />
                        </View>
                        <Text style={styles.stepLabel}>Brand details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
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
                        <Text style={styles.stepLabel}>Shipping Location</Text>
                    </View>
                </View>

                {/* Section Title */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>Shipping location</Text>
                        <TouchableOpacity style={styles.addLocationBtn}>
                            <Text style={styles.addLocationText}>+ Add Location</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.sectionSubtitle}>Enter your location</Text>
                </View>

                {/* Map View */}
                <View style={styles.mapContainer}>
                    <View style={styles.mapPlaceholder}>
                        <View style={styles.mapGrid}>
                            {[...Array(6)].map((_, i) => (
                                <View key={`h${i}`} style={[styles.gridLineH, { top: `${i * 20}%` as any }]} />
                            ))}
                            {[...Array(6)].map((_, i) => (
                                <View key={`v${i}`} style={[styles.gridLineV, { left: `${i * 20}%` as any }]} />
                            ))}
                        </View>
                        <View style={styles.roadH} />
                        <View style={styles.roadV} />
                        <View style={styles.pinContainer}>
                            <View style={styles.radiusCircle} />
                            <View style={styles.pin}>
                                <LocationIcon size={22} color="#E53935" />
                            </View>
                        </View>
                        <Text style={styles.mapLabel}>Bhopal</Text>
                    </View>
                </View>

                {/* Warehouse Cards */}
                <View style={styles.sectionContainer}>
                    {warehouses.map((warehouse) => (
                        <View key={warehouse.id} style={styles.warehouseCard}>
                            <View style={styles.warehouseHeader}>
                                <View style={styles.warehouseIconRow}>
                                    <View style={styles.locationIconBox}>
                                        <LocationIcon size={12} color="#FFF" />
                                    </View>
                                    <Text style={styles.warehouseName}>{warehouse.name}</Text>
                                </View>
                                <View style={styles.statusRow}>
                                    <Text style={[
                                        styles.statusText,
                                        warehouse.active ? styles.statusActive : styles.statusInactive
                                    ]}>
                                        {warehouse.active ? 'Active' : 'Inactive'}
                                    </Text>
                                    <Switch
                                        value={warehouse.active}
                                        onValueChange={() => toggleWarehouse(warehouse.id)}
                                        trackColor={{ false: '#CCC', true: '#4CAF50' }}
                                        thumbColor="#FFF"
                                        style={styles.switch}
                                    />
                                </View>
                            </View>

                            <Text style={styles.warehouseAddress}>{warehouse.address}</Text>
                            <Text style={styles.deliveryRadius}>
                                Delivery Radius : {warehouse.deliveryRadius}
                            </Text>

                            <View style={styles.warehouseActions}>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <PencilIcon size={14} color="#555" />
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.actionBtn}
                                    onPress={() => deleteWarehouse(warehouse.id)}
                                >
                                    <TrashIcon size={14} color="#E53935" />
                                    <Text style={styles.deleteText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Delivery Settings */}
                <View style={styles.sectionContainer}>
                    <View style={styles.deliverySettingsCard}>
                        <Text style={styles.deliverySettingsTitle}>Delivery Setting</Text>

                        <TouchableOpacity style={styles.settingRow}>
                            <View style={styles.settingLeft}>
                                <View style={styles.settingIconBox}>
                                    <ClockIcon size={14} color="#FF8C00" />
                                </View>
                                <Text style={styles.settingText}>Delivery Time: 10 - 30 mins</Text>
                            </View>
                            <ChevronIcon size={14} color="#999" />
                        </TouchableOpacity>
                        <View style={styles.divider} />

                        <TouchableOpacity style={styles.settingRow}>
                            <View style={styles.settingLeft}>
                                <View style={styles.settingIconBox}>
                                    <TagIcon size={14} color="#FF8C00" />
                                </View>
                                <Text style={styles.settingText}>Delivery Charges: ₹30 / Free above ₹199</Text>
                            </View>
                            <ChevronIcon size={14} color="#999" />
                        </TouchableOpacity>
                        <View style={styles.divider} />

                        <TouchableOpacity style={styles.settingRow}>
                            <View style={styles.settingLeft}>
                                <View style={styles.settingIconBox}>
                                    <StoreIcon size={14} color="#FF8C00" />
                                </View>
                                <Text style={styles.settingText}>Working Hours: 8 AM - 10 PM</Text>
                            </View>
                            <ChevronIcon size={14} color="#999" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
                >
                    <Text style={styles.saveButtonText}>Save & continue</Text>
                </TouchableOpacity>

                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F3F3F3' },
    topFadedText: { fontSize: 14, color: '#BDBDBD', marginLeft: 16, marginTop: 10 },
    sellerHubCard: {
        backgroundColor: '#E6C16A', height: 70, borderRadius: 6,
        marginHorizontal: 16, marginTop: 8, paddingHorizontal: 12,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    sellerHubTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
    sellerHubSubtitle: { fontSize: 10, color: '#333' },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    helpIcon: { width: 24, height: 24, backgroundColor: 'white', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    helpText: { fontSize: 14, color: '#000', fontWeight: 'bold' },
    profileImage: { width: 30, height: 30, borderRadius: 15, marginLeft: 10, backgroundColor: '#CCC' },
    progressBar: {
        backgroundColor: '#EAEAEA', marginHorizontal: 16, paddingVertical: 10,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2,
    },
    stepContainer: { alignItems: 'center', flex: 1 },
    stepCircle: {
        width: 14, height: 14, borderRadius: 7, borderWidth: 1,
        borderColor: '#999', backgroundColor: '#FFF', marginBottom: 4,
        alignItems: 'center', justifyContent: 'center',
    },
    stepCircleActive: { borderColor: '#4CAF50' },
    innerCircleActive: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4CAF50' },
    innerCircleInactive: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#999' },
    stepLabel: { fontSize: 10, color: '#333', textAlign: 'center' },
    arrowIcon: { fontSize: 14, color: '#999', marginHorizontal: 5 },
    sectionContainer: { marginHorizontal: 16, marginTop: 16 },
    sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
    sectionSubtitle: { fontSize: 12, color: '#666', marginTop: 4 },
    addLocationBtn: { backgroundColor: '#4CAF50', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
    addLocationText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
    mapContainer: { marginHorizontal: 16, marginTop: 12, borderRadius: 12, overflow: 'hidden' },
    mapPlaceholder: {
        height: 180, backgroundColor: '#E8F0E0', borderRadius: 12,
        overflow: 'hidden', justifyContent: 'center', alignItems: 'center', position: 'relative',
    },
    mapGrid: { ...StyleSheet.absoluteFillObject },
    gridLineH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#D0DCC8' },
    gridLineV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: '#D0DCC8' },
    roadH: { position: 'absolute', height: 6, left: 0, right: 0, top: '50%', backgroundColor: '#C8D4BE' },
    roadV: { position: 'absolute', width: 6, top: 0, bottom: 0, left: '45%', backgroundColor: '#C8D4BE' },
    pinContainer: { alignItems: 'center', justifyContent: 'center' },
    radiusCircle: {
        position: 'absolute', width: 100, height: 100, borderRadius: 50,
        backgroundColor: 'rgba(255, 140, 0, 0.15)', borderWidth: 1.5, borderColor: 'rgba(255, 140, 0, 0.4)',
    },
    pin: { zIndex: 1 },
    mapLabel: { position: 'absolute', bottom: 10, left: 14, fontSize: 11, color: '#555', fontWeight: '500' },
    warehouseCard: {
        backgroundColor: '#FFF', borderRadius: 12, padding: 14,
        marginBottom: 10, borderWidth: 1, borderColor: '#E8E8E8',
    },
    warehouseHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
    warehouseIconRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    locationIconBox: {
        width: 24, height: 24, borderRadius: 12, backgroundColor: '#E53935',
        alignItems: 'center', justifyContent: 'center', marginRight: 8,
    },
    warehouseName: { fontSize: 14, fontWeight: '700', color: '#111' },
    statusRow: { flexDirection: 'row', alignItems: 'center' },
    statusText: { fontSize: 12, fontWeight: '600', marginRight: 4 },
    statusActive: { color: '#4CAF50' },
    statusInactive: { color: '#999' },
    switch: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
    warehouseAddress: { fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 4 },
    deliveryRadius: { fontSize: 12, color: '#444', fontWeight: '500', marginBottom: 10 },
    warehouseActions: {
        flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F0F0F0',
        paddingTop: 10, gap: 16,
    },
    actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    editText: { fontSize: 13, color: '#555', fontWeight: '500' },
    deleteText: { fontSize: 13, color: '#E53935', fontWeight: '500' },
    deliverySettingsCard: {
        backgroundColor: '#FFF', borderRadius: 12, padding: 14,
        borderWidth: 1, borderColor: '#E8E8E8', marginBottom: 4,
    },
    deliverySettingsTitle: { fontSize: 15, fontWeight: '700', color: '#111', marginBottom: 12 },
    settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
    settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    settingIconBox: { width: 24, alignItems: 'center', marginRight: 10 },
    settingText: { fontSize: 13, color: '#333', flex: 1 },
    divider: { height: 1, backgroundColor: '#F0F0F0' },
    saveButton: {
        backgroundColor: '#000', height: 52, borderRadius: 14,
        alignItems: 'center', justifyContent: 'center', marginTop: 24, marginHorizontal: 40,
    },
    saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default VendorShippingLocationScreen;