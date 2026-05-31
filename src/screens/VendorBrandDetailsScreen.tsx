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
    Switch,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VendorBrandDetails'>;

type Brand = {
    id: string;
    name: string;
    createdDate: string;
    active: boolean;
    logo: string;
};

const INITIAL_BRANDS: Brand[] = [
    { id: '1', name: "Haldiram's", createdDate: 'Created Jan 15, 2021', active: true,  logo: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' },
    { id: '2', name: 'Tata Sampann', createdDate: 'Created Mar 10, 2021', active: true,  logo: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' },
    { id: '3', name: 'BALAJI',       createdDate: 'Created Jun 5, 2022',  active: false, logo: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' },
];

const INFO_ROWS = ['Brand ID:', 'Category:', 'Owner:', 'Email:', 'Phone:'];

const VendorBrandDetailsScreen: React.FC<Props> = ({ navigation }) => {
    const [brands, setBrands]               = useState<Brand[]>(INITIAL_BRANDS);
    const [showAll, setShowAll]             = useState(false);
    const [editingId, setEditingId]         = useState<string | null>('1');
    const [brandName, setBrandName]         = useState("HALDIRAM");
    const [status, setStatus]               = useState<'Active' | 'Inactive'>('Active');
    const [showStatusDrop, setShowStatusDrop] = useState(false);
    const [addMode, setAddMode]             = useState(false);

    const visibleBrands = showAll ? brands : brands.slice(0, 3);

    const toggleBrand = (id: string) =>
        setBrands(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));

    const editingBrand = brands.find(b => b.id === editingId);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                {/* Top faded text */}
                <Text style={styles.topFadedText}>brand detail</Text>

                {/* Seller Hub Header */}
                <View style={styles.sellerHubCard}>
                    <View>
                        <Text style={styles.sellerHubTitle}>Seller hub</Text>
                        <Text style={styles.sellerHubSubtitle}>by FROOKOON</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <View style={styles.helpIcon}><Text style={styles.helpText}>?</Text></View>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.profileImage}
                        />
                    </View>
                </View>

                {/* Step Progress Bar */}
                <View style={styles.progressBar}>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle}><View style={styles.innerCircleInactive} /></View>
                        <Text style={styles.stepLabel}>Bank details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                    <View style={styles.stepContainer}>
                        <View style={[styles.stepCircle, styles.stepCircleActive]}><View style={styles.innerCircleActive} /></View>
                        <Text style={styles.stepLabel}>brand details</Text>
                    </View>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle} />
                        <Text style={styles.stepLabel}>Shipping Location</Text>
                    </View>
                </View>

                {/* Section header row */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.sectionTitle}>brand details</Text>
                        <Text style={styles.sectionSubtitle}>Enter brand of your business</Text>
                    </View>
                    <View style={styles.headerBtns}>
                        {editingId && (
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditingId(null)}>
                                <Text style={styles.cancelBtnText}>Cancel</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.addBrandBtn} onPress={() => setAddMode(true)}>
                            <Text style={styles.addBrandBtnText}>+ Add brand</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Brand list ── */}
                <View style={styles.sectionContainer}>
                    {visibleBrands.map((brand) => (
                        <View key={brand.id} style={[styles.brandRow, editingId === brand.id && styles.brandRowActive]}>
                            {/* Logo */}
                            <View style={styles.brandLogoCircle}>
                                <Image source={{ uri: brand.logo }} style={styles.brandLogoImg} />
                            </View>

                            {/* Name + date */}
                            <View style={styles.brandInfo}>
                                <Text style={styles.brandName}>{brand.name}</Text>
                                <Text style={styles.brandDate}>{brand.createdDate}</Text>
                            </View>

                            {/* Active badge + toggle */}
                            <View style={[styles.activeBadge, { backgroundColor: brand.active ? '#4CAF50' : '#999' }]}>
                                <Text style={styles.activeBadgeText}>{brand.active ? 'Active' : 'Inactive'}</Text>
                                <Switch
                                    value={brand.active}
                                    onValueChange={() => toggleBrand(brand.id)}
                                    trackColor={{ false: 'rgba(255,255,255,0.3)', true: 'rgba(255,255,255,0.3)' }}
                                    thumbColor="#FFF"
                                    style={styles.switch}
                                />
                            </View>

                            {/* Edit icon */}
                            <TouchableOpacity
                                style={styles.editIconBtn}
                                onPress={() => { setEditingId(brand.id); setBrandName(brand.name.toUpperCase()); }}
                            >
                                <View style={styles.pencilIcon}>
                                    <View style={styles.pencilBody} />
                                    <View style={styles.pencilTip} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}

                    {/* View all toggle */}
                    {brands.length > 3 && (
                        <TouchableOpacity style={styles.viewAllRow} onPress={() => setShowAll(!showAll)}>
                            <Text style={styles.viewAllText}>{showAll ? 'Show less' : 'View all brands'}</Text>
                            <Text style={styles.viewAllChevron}>{showAll ? '∧' : '∨'}</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* ── Brand edit form ── */}
                {(editingId || addMode) && (
                    <View style={styles.sectionContainer}>
                        <View style={styles.editFormCard}>
                            {/* Logo preview + name/status row */}
                            <View style={styles.formTopRow}>
                                <View style={styles.formLogoCircle}>
                                    {editingBrand
                                        ? <Image source={{ uri: editingBrand.logo }} style={styles.formLogoImg} />
                                        : <Text style={styles.formLogoPlaceholder}>+</Text>
                                    }
                                </View>
                                <View style={styles.formFields}>
                                    {/* Brand name */}
                                    <View style={styles.formFieldBox}>
                                        <Text style={styles.formFieldLabel}>Brand name</Text>
                                        <TextInput
                                            style={styles.formInput}
                                            value={brandName}
                                            onChangeText={setBrandName}
                                            placeholder="Enter brand name"
                                            placeholderTextColor="#AAA"
                                        />
                                    </View>
                                    {/* Status dropdown */}
                                    <View style={[styles.formFieldBox, { zIndex: 999 }]}>
                                        <Text style={styles.formFieldLabel}>Status</Text>
                                        <TouchableOpacity
                                            style={[styles.statusDropBox, { backgroundColor: status === 'Active' ? '#4CAF50' : '#999' }]}
                                            onPress={() => setShowStatusDrop(!showStatusDrop)}
                                        >
                                            <Text style={styles.statusDropText}>{status}</Text>
                                            <Text style={styles.statusDropArrow}>{showStatusDrop ? '▲' : '▼'}</Text>
                                        </TouchableOpacity>
                                        {showStatusDrop && (
                                            <View style={styles.statusDropList}>
                                                {(['Active', 'Inactive'] as const).map(opt => (
                                                    <TouchableOpacity
                                                        key={opt}
                                                        style={[styles.statusDropOption, status === opt && styles.statusDropOptionSelected]}
                                                        onPress={() => { setStatus(opt); setShowStatusDrop(false); }}
                                                    >
                                                        <Text style={[styles.statusDropOptionText, status === opt && { color: '#2E7D32', fontWeight: '700' }]}>{opt}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>

                            {/* Brand Information */}
                            <View style={styles.infoCard}>
                                <Text style={styles.cardTitle}>Brand Information</Text>
                                {INFO_ROWS.map((label, i) => (
                                    <View key={i} style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>{label}</Text>
                                        <View style={styles.infoBar} />
                                    </View>
                                ))}
                            </View>

                            {/* Description */}
                            <View style={styles.descCard}>
                                <Text style={styles.cardTitle}>Description</Text>
                                <Text style={styles.descText}>Premium quality product with trusted service</Text>
                            </View>
                        </View>
                    </View>
                )}

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
    safeArea: { flex: 1, backgroundColor: '#F3F3F3' },
    topFadedText: { fontSize: 14, color: '#BDBDBD', marginLeft: 16, marginTop: 10 },

    // Header card
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

    // Progress
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

    // Section header
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginHorizontal: 16, marginTop: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
    sectionSubtitle: { fontSize: 12, color: '#666', marginTop: 4 },
    headerBtns: { flexDirection: 'row', gap: 8, alignItems: 'center' },
    cancelBtn: { borderWidth: 1, borderColor: '#999', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },
    cancelBtnText: { fontSize: 12, color: '#555' },
    addBrandBtn: { backgroundColor: '#111', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
    addBrandBtnText: { fontSize: 12, color: '#FFF', fontWeight: '600' },

    sectionContainer: { marginHorizontal: 16, marginTop: 12 },

    // Brand row
    brandRow: {
        backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 8,
        flexDirection: 'row', alignItems: 'center',
        borderWidth: 1, borderColor: '#EBEBEB',
    },
    brandRowActive: { borderColor: '#4CAF50', backgroundColor: '#F9FFF9' },
    brandLogoCircle: { width: 44, height: 44, borderRadius: 22, overflow: 'hidden', backgroundColor: '#F0F0F0' },
    brandLogoImg: { width: 44, height: 44, borderRadius: 22 },
    brandInfo: { flex: 1, marginLeft: 10 },
    brandName: { fontSize: 13, fontWeight: '700', color: '#111' },
    brandDate: { fontSize: 10, color: '#888', marginTop: 2 },
    activeBadge: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: 20, paddingLeft: 8, paddingRight: 2, paddingVertical: 2,
        marginLeft: 6,
    },
    activeBadgeText: { fontSize: 11, color: '#FFF', fontWeight: '600' },
    switch: { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
    editIconBtn: { marginLeft: 6, padding: 6 },
    pencilIcon: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
    pencilBody: { width: 9, height: 11, borderWidth: 1.5, borderColor: '#555', borderRadius: 1, transform: [{ rotate: '-45deg' }] },
    pencilTip: { width: 0, height: 0, borderLeftWidth: 4, borderRightWidth: 4, borderTopWidth: 5, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#555', marginTop: -2, transform: [{ rotate: '-45deg' }] },

    // View all
    viewAllRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
    viewAllText: { fontSize: 13, color: '#444', fontWeight: '500' },
    viewAllChevron: { fontSize: 13, color: '#444', marginLeft: 4 },

    // Edit form card
    editFormCard: {
        backgroundColor: '#FFF', borderRadius: 14,
        borderWidth: 1, borderColor: '#E0E0E0',
        overflow: 'hidden',
    },
    formTopRow: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, gap: 12 },
    formLogoCircle: {
        width: 52, height: 52, borderRadius: 26,
        backgroundColor: '#E53935', overflow: 'hidden',
        alignItems: 'center', justifyContent: 'center',
    },
    formLogoImg: { width: 52, height: 52 },
    formLogoPlaceholder: { fontSize: 22, color: '#FFF', fontWeight: 'bold' },
    formFields: { flex: 1, flexDirection: 'row', gap: 10 },
    formFieldBox: { flex: 1 },
    formFieldLabel: { fontSize: 10, color: '#888', marginBottom: 4 },
    formInput: {
        height: 36, backgroundColor: '#F5F5F5', borderRadius: 8,
        paddingHorizontal: 10, fontSize: 13, color: '#111',
        borderWidth: 1, borderColor: '#E0E0E0',
    },
    statusDropBox: {
        height: 36, borderRadius: 8, paddingHorizontal: 10,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    statusDropText: { fontSize: 13, color: '#FFF', fontWeight: '600' },
    statusDropArrow: { fontSize: 9, color: '#FFF' },
    statusDropList: {
        position: 'absolute', top: 40, left: 0, right: 0,
        backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0',
        overflow: 'hidden', elevation: 5, zIndex: 999,
    },
    statusDropOption: { paddingVertical: 10, paddingHorizontal: 12 },
    statusDropOptionSelected: { backgroundColor: '#F1F8F1' },
    statusDropOptionText: { fontSize: 13, color: '#333' },

    // Info card
    infoCard: {
        backgroundColor: '#F7F7F7', borderTopWidth: 1, borderTopColor: '#EBEBEB',
        padding: 14,
    },
    cardTitle: { fontSize: 14, fontWeight: '700', color: '#000', marginBottom: 10 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    infoLabel: { fontSize: 12, color: '#555' },
    infoBar: { width: 110, height: 9, backgroundColor: '#D8D8D8', borderRadius: 4 },

    // Description
    descCard: {
        backgroundColor: '#F7F7F7', borderTopWidth: 1, borderTopColor: '#EBEBEB',
        padding: 14,
    },
    descText: { fontSize: 12, color: '#555', marginTop: 2 },

    // Save button
    saveButton: {
        backgroundColor: '#000', height: 52, borderRadius: 14,
        alignItems: 'center', justifyContent: 'center', marginTop: 24, marginHorizontal: 40,
    },
    saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default VendorBrandDetailsScreen;