import React, { useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView,
    ScrollView, TouchableOpacity, Image, Switch, TextInput,
} from 'react-native';

const VendorStoreSettingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [storeStatus, setStoreStatus]       = useState(true);
    const [autoAccept, setAutoAccept]         = useState(true);

    const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionCard}>{children}</View>
        </View>
    );

    const InfoRow: React.FC<{ icon: string; label: string; value: string; editable?: boolean }> = ({ icon, label, value, editable }) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>{icon}</Text>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
            {editable && <TouchableOpacity style={styles.editIconBtn}><Text style={styles.editIconText}>✏️</Text></TouchableOpacity>}
        </View>
    );

    const ChevronRow: React.FC<{ icon: string; label: string; value?: string }> = ({ icon, label, value }) => (
        <TouchableOpacity style={styles.chevronRow} activeOpacity={0.7}>
            <View style={styles.chevronLeft}>
                <Text style={styles.infoIcon}>{icon}</Text>
                <Text style={styles.infoLabel}>{label}</Text>
            </View>
            <View style={styles.chevronRight}>
                {value ? <Text style={styles.infoValue}>{value}</Text> : null}
                <Text style={styles.chevron}>›</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* ── Header ── */}
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                        style={styles.headerLogo}
                    />
                    <Text style={styles.headerTitle}>Store Setting</Text>
                </View>

                {/* ── Store Banner Card ── */}
                <View style={styles.storeBannerCard}>
                    <View style={styles.storeIconBox}>
                        <Text style={styles.storeIconEmoji}>🏪</Text>
                    </View>
                    <View style={styles.storeInfo}>
                        <Text style={styles.storeName}>ABC Grocery Store</Text>
                        <View style={styles.openBadge}>
                            <View style={styles.openDot} />
                            <Text style={styles.openText}>Open</Text>
                        </View>
                        <Text style={styles.storeTagline}>Fresh groceries delivered{'\n'}to your store everyday!</Text>
                    </View>
                </View>

                {/* ── Store Information ── */}
                <Section title="Store information">
                    <InfoRow icon="🏷️" label="Store name"        value="ABC Grocery Store" editable />
                    <View style={styles.divider} />
                    <InfoRow icon="📝" label="Store Description"  value="Fresh groceries..." editable />
                    <View style={styles.divider} />
                    <ChevronRow icon="🖼️" label="Store Banner" />
                </Section>

                {/* ── Business Details ── */}
                <Section title="Bussiness Details">
                    <InfoRow icon="📊" label="GST Number"    value="23jbfb4ee632" editable />
                    <View style={styles.divider} />
                    <InfoRow icon="🗂️" label="PAN Number"    value="ABCS2633Gy"   editable />
                    <View style={styles.divider} />
                    <InfoRow icon="✅" label="FSSAI License"  value="1515120251515" editable />
                </Section>

                {/* ── Store Operations ── */}
                <Section title="Store operations">
                    <View style={styles.toggleRow}>
                        <View style={styles.toggleLeft}>
                            <Text style={styles.infoIcon}>🟢</Text>
                            <Text style={styles.infoLabel}>Store status</Text>
                        </View>
                        <Switch
                            value={storeStatus}
                            onValueChange={setStoreStatus}
                            trackColor={{ false: '#DDD', true: '#4CAF50' }}
                            thumbColor="#FFF"
                            style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                        />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.toggleRow}>
                        <View style={styles.toggleLeft}>
                            <Text style={styles.infoIcon}>⚡</Text>
                            <Text style={styles.infoLabel}>Auto accept orders</Text>
                        </View>
                        <Switch
                            value={autoAccept}
                            onValueChange={setAutoAccept}
                            trackColor={{ false: '#DDD', true: '#F5A623' }}
                            thumbColor="#FFF"
                            style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                        />
                    </View>
                    <View style={styles.divider} />
                    <ChevronRow icon="📍" label="Delivery Radius" value="10 km" />
                </Section>

                {/* ── Working Hours ── */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.workingHoursCard} activeOpacity={0.8}>
                        <View style={styles.workingHoursLeft}>
                            <Text style={styles.clockIcon}>🕐</Text>
                            <Text style={styles.workingHoursLabel}>Working Hours</Text>
                        </View>
                        <View style={styles.workingHoursRight}>
                            <Text style={styles.workingHoursValue}>Mon - Sun  08:00 AM - 10:00 PM</Text>
                            <Text style={styles.chevron}>›</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* ── Payment & Delivery ── */}
                <Section title="Payment & Delivery">
                    <ChevronRow icon="💰" label="Minimum order Amount"  value="Rs 200" />
                    <View style={styles.divider} />
                    <ChevronRow icon="🚚" label="Delivery Charges"      value="Rs 50" />
                    <View style={styles.divider} />
                    <ChevronRow icon="🎁" label="Free Delivery above"   value="Rs 799" />
                    <View style={styles.divider} />
                    <ChevronRow icon="🏦" label="Bank Account"          value="**** **** 1234" />
                    <View style={styles.divider} />
                    <ChevronRow icon="📲" label="UPI ID"                value="abc12@upi" />
                </Section>

                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F3F3F3' },

    header: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16, paddingVertical: 14,
        borderBottomWidth: 1, borderBottomColor: '#EEE',
    },
    headerLogo: { width: 50, height: 28, resizeMode: 'contain', marginBottom: 6 },
    headerTitle: { fontSize: 20, fontWeight: '700', color: '#111' },

    // Store banner card
    storeBannerCard: {
        backgroundColor: '#FDF3DC',
        marginHorizontal: 16, marginTop: 16,
        borderRadius: 14, padding: 16,
        flexDirection: 'row', alignItems: 'center',
        borderWidth: 1, borderColor: '#F0DCA0',
    },
    storeIconBox: {
        width: 54, height: 54, borderRadius: 12,
        backgroundColor: '#FFF', alignItems: 'center',
        justifyContent: 'center', marginRight: 14,
        borderWidth: 1, borderColor: '#EDD98A',
    },
    storeIconEmoji: { fontSize: 26 },
    storeInfo: { flex: 1 },
    storeName: { fontSize: 16, fontWeight: '700', color: '#111' },
    openBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
    openDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#4CAF50', marginRight: 5 },
    openText: { fontSize: 12, color: '#4CAF50', fontWeight: '600' },
    storeTagline: { fontSize: 11, color: '#888', marginTop: 4, lineHeight: 16 },

    // Section
    section: { marginHorizontal: 16, marginTop: 16 },
    sectionTitle: { fontSize: 13, fontWeight: '700', color: '#F57C00', marginBottom: 8, letterSpacing: 0.3 },
    sectionCard: {
        backgroundColor: '#FFF', borderRadius: 14,
        borderWidth: 1, borderColor: '#EBEBEB', overflow: 'hidden',
    },

    // Info row
    infoRow: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 14, paddingVertical: 12,
    },
    infoIcon: { fontSize: 15, marginRight: 10, width: 22, textAlign: 'center' },
    infoLabel: { fontSize: 13, color: '#444', fontWeight: '500', flex: 1 },
    infoValue: { fontSize: 13, color: '#222', fontWeight: '500', maxWidth: 130, textAlign: 'right' },
    editIconBtn: { marginLeft: 8 },
    editIconText: { fontSize: 13 },

    // Chevron row
    chevronRow: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14, paddingVertical: 13,
    },
    chevronLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    chevronRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    chevron: { fontSize: 20, color: '#BBB' },

    // Toggle row
    toggleRow: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14, paddingVertical: 10,
    },
    toggleLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },

    // Working hours
    workingHoursCard: {
        backgroundColor: '#FFF', borderRadius: 14,
        borderWidth: 1, borderColor: '#EBEBEB',
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14, paddingVertical: 13,
    },
    workingHoursLeft: { flexDirection: 'row', alignItems: 'center' },
    clockIcon: { fontSize: 15, marginRight: 10 },
    workingHoursLabel: { fontSize: 13, color: '#444', fontWeight: '500' },
    workingHoursRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    workingHoursValue: { fontSize: 12, color: '#555' },

    divider: { height: 1, backgroundColor: '#F5F5F5', marginHorizontal: 14 },
});

export default VendorStoreSettingScreen;