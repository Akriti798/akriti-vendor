import React, { useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView,
    ScrollView, TouchableOpacity, Image, Switch,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';

type Props = {
    navigation: NativeStackNavigationProp<ProfileStackParamList, 'VendorProfileSetting'>;
};

const VendorProfileSettingScreen: React.FC<Props> = ({ navigation }) => {
    const [twoFactor, setTwoFactor]   = useState(true);
    const [orderNotif, setOrderNotif] = useState(true);
    const [promoNotif, setPromoNotif] = useState(true);

    // ── Reusable row components ──────────────────────────────
    const SectionTitle = ({ title }: { title: string }) => (
        <Text style={styles.sectionTitle}>{title}</Text>
    );

    const InfoRow = ({
        icon, label, value,
    }: { icon: string; label: string; value: string }) => (
        <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
                <Text style={styles.rowIcon}>{icon}</Text>
                <Text style={styles.infoLabel}>{label}</Text>
            </View>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );

    const ActionRow = ({
        icon, label, onPress, rightElement, last = false,
    }: {
        icon: string; label: string; onPress?: () => void;
        rightElement?: React.ReactNode; last?: boolean;
    }) => (
        <>
            <TouchableOpacity style={styles.actionRow} onPress={onPress} activeOpacity={0.7}>
                <View style={styles.infoLeft}>
                    <Text style={styles.rowIcon}>{icon}</Text>
                    <Text style={styles.actionLabel}>{label}</Text>
                </View>
                {rightElement ?? <Text style={styles.chevron}>›</Text>}
            </TouchableOpacity>
            {!last && <View style={styles.divider} />}
        </>
    );
    // ────────────────────────────────────────────────────────

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

                {/* ── Top logo ── */}
                <View style={styles.topBar}>
                    <Image
                        source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                        style={styles.logo}
                    />
                </View>

                {/* ── Page title ── */}
                <Text style={styles.pageTitle}>Profile Setting</Text>

                {/* ── Profile card ── */}
                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                        style={styles.avatar}
                    />
                    <View style={styles.profileText}>
                        <Text style={styles.profileName}>Amit Patel</Text>
                        <Text style={styles.profileVendorId}>
                            Vendor ID : <Text style={styles.vendorIdHighlight}>VEN2234</Text>
                        </Text>
                        <Text style={styles.profileEmail}>amitpatel@gmail.com</Text>
                    </View>
                </View>

                {/* ── Personal information ── */}
                <View style={styles.card}>
                    <SectionTitle title="Personal information" />
                    <InfoRow icon="👤" label="Full name"      value="Amit Patel" />
                    <View style={styles.divider} />
                    <InfoRow icon="📱" label="Mobile Number"  value="6151512015" />
                    <View style={styles.divider} />
                    <InfoRow icon="✉️" label="E-mail address" value="amitpatel@gmail.com" />
                    <View style={styles.divider} />
                    <InfoRow icon="🎂" label="Date of Birth"  value="12/12/2012" />
                </View>

                {/* ── Security ── */}
                <View style={styles.card}>
                    <SectionTitle title="Security" />
                    <ActionRow icon="🔒" label="Change Password" />
                    <ActionRow
                        icon="🛡️"
                        label="Two-Factor authentication"
                        rightElement={
                            <Switch
                                value={twoFactor}
                                onValueChange={setTwoFactor}
                                trackColor={{ false: '#DDD', true: '#F5A623' }}
                                thumbColor="#FFF"
                                style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                            />
                        }
                    />
                    <ActionRow icon="🔑" label="Change pin" last />
                </View>

                {/* ── Notifications ── */}
                <View style={styles.card}>
                    <SectionTitle title="Notifications" />
                    <ActionRow
                        icon="🔔"
                        label="Order notifications"
                        rightElement={
                            <Switch
                                value={orderNotif}
                                onValueChange={setOrderNotif}
                                trackColor={{ false: '#DDD', true: '#F5A623' }}
                                thumbColor="#FFF"
                                style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                            />
                        }
                    />
                    <ActionRow
                        icon="📢"
                        label="Promotional notifications"
                        last
                        rightElement={
                            <Switch
                                value={promoNotif}
                                onValueChange={setPromoNotif}
                                trackColor={{ false: '#DDD', true: '#F5A623' }}
                                thumbColor="#FFF"
                                style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                            />
                        }
                    />
                </View>

                {/* ── Others ── */}
                <View style={styles.card}>
                    <SectionTitle title="Others" />
                    <ActionRow icon="🔏" label="Privacy Policy" />
                    <ActionRow icon="📋" label="Terms & conditions" />
                    <ActionRow
                        icon="🚪"
                        label="Logout"
                        last
                        onPress={() => {}}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F3F3F3' },

    topBar: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
    },
    logo: { width: 60, height: 32, resizeMode: 'contain' },

    pageTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111',
        marginHorizontal: 16,
        marginTop: 6,
        marginBottom: 14,
    },

    // Profile card — warm gold background like Figma
    profileCard: {
        backgroundColor: '#FDF0C8',
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#EDD98A',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#DDD',
        marginRight: 14,
        borderWidth: 2,
        borderColor: '#E8C96A',
    },
    profileText: { flex: 1 },
    profileName: { fontSize: 17, fontWeight: '700', color: '#111' },
    profileVendorId: { fontSize: 12, color: '#555', marginTop: 3 },
    vendorIdHighlight: { color: '#F57C00', fontWeight: '700' },
    profileEmail: { fontSize: 12, color: '#777', marginTop: 2 },

    // Section card
    card: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        marginBottom: 14,
        overflow: 'hidden',
        paddingHorizontal: 14,
        paddingBottom: 4,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#F57C00',
        paddingTop: 14,
        paddingBottom: 10,
        letterSpacing: 0.2,
    },

    // Info row (label + value side by side)
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 11,
    },
    infoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rowIcon: {
        fontSize: 15,
        width: 24,
        textAlign: 'center',
        marginRight: 10,
    },
    infoLabel: {
        fontSize: 13,
        color: '#444',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 13,
        color: '#222',
        fontWeight: '500',
        textAlign: 'right',
        maxWidth: 170,
    },

    // Action row (label + chevron or toggle)
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 13,
    },
    actionLabel: {
        fontSize: 14,
        color: '#222',
        fontWeight: '500',
    },
    chevron: {
        fontSize: 22,
        color: '#CCC',
        lineHeight: 24,
    },

    divider: {
        height: 1,
        backgroundColor: '#F4F4F4',
        marginLeft: 34,
    },
});

export default VendorProfileSettingScreen;