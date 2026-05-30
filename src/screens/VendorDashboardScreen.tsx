import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type VendorDashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VendorDashboard'>;
interface Props { navigation: VendorDashboardNavigationProp; }

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 64;
const CHART_HEIGHT = 100;

// ── Wave chart data ─────────────────────────────────────────
const WEEKLY_DATA  = [30, 55, 40, 80, 60, 90, 50];
const MONTHLY_DATA = [20, 45, 35, 70, 50, 85, 65];
const WEEK_LABELS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WaveChart: React.FC<{ data: number[]; labels: string[] }> = ({ data, labels }) => {
    const max = Math.max(...data);
    const pts = data.map((v, i) => {
        const x = (i / (data.length - 1)) * CHART_WIDTH;
        const y = CHART_HEIGHT - (v / max) * CHART_HEIGHT;
        return { x, y };
    });

    // Build SVG-like path using Views positioned absolutely
    return (
        <View style={{ height: CHART_HEIGHT + 30 }}>
            {/* Area fill using trapezoids */}
            <View style={{ height: CHART_HEIGHT, position: 'relative', overflow: 'hidden' }}>
                {pts.map((pt, i) => {
                    if (i === pts.length - 1) return null;
                    const next = pts[i + 1];
                    const segW = next.x - pt.x;
                    const minY = Math.min(pt.y, next.y);
                    const maxY = Math.max(pt.y, next.y);
                    return (
                        <View key={i} style={{
                            position: 'absolute',
                            left: pt.x,
                            top: minY,
                            width: segW,
                            height: CHART_HEIGHT - minY,
                            backgroundColor: 'rgba(255,122,0,0.10)',
                        }} />
                    );
                })}
                {/* Line segments */}
                {pts.map((pt, i) => {
                    if (i === pts.length - 1) return null;
                    const next = pts[i + 1];
                    const dx = next.x - pt.x;
                    const dy = next.y - pt.y;
                    const len = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                    return (
                        <View key={`l${i}`} style={{
                            position: 'absolute',
                            left: pt.x,
                            top: pt.y - 1,
                            width: len,
                            height: 2.5,
                            backgroundColor: '#ff7a00',
                            borderRadius: 2,
                            transform: [{ rotate: `${angle}deg` }, { translateX: len / 2 }, { translateX: -len / 2 }],
                            transformOrigin: '0 50%',
                        }} />
                    );
                })}
                {/* Dots */}
                {pts.map((pt, i) => (
                    <View key={`d${i}`} style={{
                        position: 'absolute',
                        left: pt.x - 4,
                        top: pt.y - 4,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#ff7a00',
                        borderWidth: 2,
                        borderColor: '#fff',
                    }} />
                ))}
            </View>
            {/* Labels */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                {labels.map((l, i) => (
                    <Text key={i} style={styles.chartLabelText}>{l}</Text>
                ))}
            </View>
        </View>
    );
};

// ── Stat card icons (pure View) ─────────────────────────────
const BagIcon = () => (
    <View style={{ width: 22, height: 22, alignItems: 'center' }}>
        <View style={{ width: 14, height: 16, borderWidth: 2, borderColor: '#e65100', borderRadius: 3, marginTop: 4 }} />
        <View style={{ position: 'absolute', top: 0, width: 8, height: 6, borderTopLeftRadius: 4, borderTopRightRadius: 4, borderWidth: 2, borderBottomWidth: 0, borderColor: '#e65100' }} />
    </View>
);

const RupeeIcon = () => (
    <View style={{ width: 22, height: 22, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2e7d32' }}>₹</Text>
    </View>
);

const ClockIcon2 = () => (
    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#f59e0b', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 1.5, height: 6, backgroundColor: '#f59e0b', position: 'absolute', top: 2 }} />
        <View style={{ width: 5, height: 1.5, backgroundColor: '#f59e0b', position: 'absolute', right: 3 }} />
    </View>
);

const AlertIcon = () => (
    <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 0, height: 0, borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 18, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#ef5350' }} />
        <Text style={{ position: 'absolute', bottom: 1, fontSize: 9, fontWeight: 'bold', color: '#fff' }}>!</Text>
    </View>
);

// ── Main Screen ─────────────────────────────────────────────
const VendorDashboardScreen: React.FC<Props> = ({ navigation }) => {
    const [chartTab, setChartTab] = useState<'Weekly' | 'Monthly'>('Weekly');
    const chartData = chartTab === 'Weekly' ? WEEKLY_DATA : MONTHLY_DATA;

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.headerCard}>
                    <View style={styles.headerLeft}>
                        <View style={styles.frookoonBadge}>
                            <Text style={styles.frookoonText}>FROOKOON</Text>
                        </View>
                        <Text style={styles.headerTitle}>Hello , AMIT PATEL 🔥</Text>
                        <Text style={styles.headerSubtitle}>Here's your today's report</Text>
                    </View>
                    <Image
                        source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                        style={styles.headerAvatar}
                    />
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={[styles.statCard, { borderTopColor: '#ff7a00' }]}>
                        <View style={[styles.statIconBox, { backgroundColor: '#fff3e0' }]}>
                            <BagIcon />
                        </View>
                        <Text style={styles.statTitle}>Total Orders</Text>
                        <Text style={styles.statNumber}>120</Text>
                        <Text style={styles.statSubGreen}>+12% this week</Text>
                    </View>

                    <View style={[styles.statCard, { borderTopColor: '#2e7d32' }]}>
                        <View style={[styles.statIconBox, { backgroundColor: '#e8f5e9' }]}>
                            <RupeeIcon />
                        </View>
                        <Text style={styles.statTitle}>Total Earnings</Text>
                        <Text style={styles.statNumber}>₹45,000</Text>
                        <Text style={styles.statSubGreen}>+8% this week</Text>
                    </View>

                    <View style={[styles.statCard, { borderTopColor: '#f59e0b' }]}>
                        <View style={[styles.statIconBox, { backgroundColor: '#fff8e1' }]}>
                            <ClockIcon2 />
                        </View>
                        <Text style={styles.statTitle}>Pending Orders</Text>
                        <Text style={styles.statNumber}>8</Text>
                        <View style={[styles.badge, { backgroundColor: '#fde68a' }]}>
                            <Text style={[styles.badgeText, { color: '#92400e' }]}>• Processing</Text>
                        </View>
                    </View>

                    <View style={[styles.statCard, { borderTopColor: '#ef5350' }]}>
                        <View style={[styles.statIconBox, { backgroundColor: '#ffebee' }]}>
                            <AlertIcon />
                        </View>
                        <Text style={styles.statTitle}>Low Stock</Text>
                        <Text style={styles.statNumber}>3 Items</Text>
                        <View style={[styles.badge, { backgroundColor: '#ffd5d5' }]}>
                            <Text style={[styles.badgeText, { color: '#b31212' }]}>• Restock Soon</Text>
                        </View>
                    </View>
                </View>

                {/* Sales Overview */}
                <View style={styles.chartCard}>
                    <View style={styles.chartHeaderRow}>
                        <Text style={styles.sectionTitle}>Sales Overview</Text>
                        <View style={styles.tabRow}>
                            <TouchableOpacity
                                style={[styles.tabBtn, chartTab === 'Weekly' && styles.tabBtnActive]}
                                onPress={() => setChartTab('Weekly')}
                            >
                                <Text style={[styles.tabTxt, chartTab === 'Weekly' && styles.tabTxtActive]}>Weekly</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tabBtn, chartTab === 'Monthly' && styles.tabBtnActive]}
                                onPress={() => setChartTab('Monthly')}
                            >
                                <Text style={[styles.tabTxt, chartTab === 'Monthly' && styles.tabTxtActive]}>Monthly</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <WaveChart data={chartData} labels={WEEK_LABELS} />
                </View>

                {/* Recent Orders */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Orders</Text>

                    <TouchableOpacity
                        style={styles.orderCard}
                        onPress={() => navigation.navigate('VendorOrderDetail', { orderId: '1234' })}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.orderImg}
                        />
                        <View style={styles.orderMid}>
                            <View style={styles.line1} />
                            <View style={styles.line2} />
                        </View>
                        <View style={styles.deliveredBadge}>
                            <Text style={styles.checkMark}>✓ </Text>
                            <Text style={styles.deliveredText}>Delivered</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.orderCard}
                        onPress={() => navigation.navigate('VendorOrderDetail', { orderId: '5678' })}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.orderImg}
                        />
                        <View style={styles.orderMid}>
                            <View style={styles.line1} />
                            <View style={styles.line2} />
                        </View>
                        <View style={styles.pendingBadge}>
                            <Text style={styles.checkMark}>✓ </Text>
                            <Text style={styles.pendingText}>Pending</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#f3f3f3' },
    scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },

    // Header
    headerCard: {
        backgroundColor: '#e6d5a8',
        borderRadius: 16,
        padding: 16,
        marginTop: 12,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLeft: { flex: 1 },
    frookoonBadge: {
        backgroundColor: 'rgba(0,0,0,0.08)',
        alignSelf: 'flex-start',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginBottom: 6,
    },
    frookoonText: { fontSize: 9, fontWeight: '700', color: '#555', letterSpacing: 1 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
    headerSubtitle: { fontSize: 13, color: '#444', marginTop: 3 },
    headerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#D4A84B',
        marginLeft: 12,
    },

    // Stats
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    statCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderTopWidth: 3,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    statIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    statTitle: { fontSize: 11, color: '#777', marginBottom: 4 },
    statNumber: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 4 },
    statSubGreen: { fontSize: 11, color: '#2e7d32', fontWeight: '600' },
    badge: { alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6, marginTop: 2 },
    badgeText: { fontSize: 10, fontWeight: '600' },

    // Chart
    chartCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    chartHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 15, fontWeight: '700', color: '#000' },
    tabRow: { flexDirection: 'row', backgroundColor: '#f3f3f3', borderRadius: 20, padding: 2 },
    tabBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 18 },
    tabBtnActive: { backgroundColor: '#333' },
    tabTxt: { fontSize: 11, color: '#666', fontWeight: '500' },
    tabTxtActive: { color: '#fff' },
    chartLabelText: { fontSize: 10, color: '#999', textAlign: 'center', flex: 1 },

    // Orders
    section: { marginBottom: 10 },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
    },
    orderImg: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#f0f0f0', marginRight: 10 },
    orderMid: { flex: 1 },
    line1: { width: '70%', height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, marginBottom: 6 },
    line2: { width: '40%', height: 8, backgroundColor: '#f0f0f0', borderRadius: 4 },
    deliveredBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    checkMark: { fontSize: 10, color: '#16a34a', fontWeight: 'bold' },
    deliveredText: { fontSize: 11, fontWeight: '700', color: '#16a34a' },
    pendingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff7ed', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    pendingText: { fontSize: 11, fontWeight: '700', color: '#d97706' },
});

export default VendorDashboardScreen;