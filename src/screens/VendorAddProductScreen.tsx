import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProductsStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type VendorAddProductNavigationProp = NativeStackNavigationProp<ProductsStackParamList, 'VendorAddProduct'>;
interface Props { navigation: VendorAddProductNavigationProp; }

const CATEGORIES = ['All', 'Dry Fruits', 'Snacks', 'Beverages', 'Dairy', 'Grocery', 'Personal Care'];

const VendorAddProductScreen: React.FC<Props> = ({ navigation }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice]             = useState('');
    const [discount, setDiscount]       = useState('');
    const [stock, setStock]             = useState('');
    const [sku, setSku]                 = useState('');
    const [category, setCategory]       = useState('All');
    const [showCatDrop, setShowCatDrop] = useState(false);

    const handleAddProduct = () => {
        if (!productName.trim()) {
            Alert.alert('Validation', 'Please enter a product name.');
            return;
        }
        if (!price.trim()) {
            Alert.alert('Validation', 'Please enter a price.');
            return;
        }
        navigation.navigate('VendorProductList', {
            newProduct: {
                id: Date.now().toString(),
                name: productName.trim(),
                category: category === 'All' ? 'General' : category,
                description: description.trim(),
                price: price.trim(),
                stock: stock.trim() || '0',
                stockStatus: 'in_stock' as const,
                isPublished: true,
            },
        });
    };

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                {/* ── Header Card with illustration ── */}
                <View style={styles.headerCard}>
                    <View style={styles.headerTopRow}>
                        <View>
                            <Image
                                source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                                style={styles.logo}
                            />
                            <Text style={styles.welcomeText}>Welcome to Frookoon Vendor Panel</Text>
                            <Text style={styles.vendorName}>AMIT PATEL</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.avatar}
                        />
                    </View>

                    {/* Illustration — built-in so no external asset needed */}
                    <View style={styles.illustrationContainer}>
                        {/* Coins stack */}
                        <View style={[styles.coin, { bottom: 10, right: 90, width: 28, height: 14, backgroundColor: '#F5C518' }]} />
                        <View style={[styles.coin, { bottom: 20, right: 86, width: 28, height: 14, backgroundColor: '#F5C518' }]} />
                        <View style={[styles.coin, { bottom: 30, right: 88, width: 28, height: 14, backgroundColor: '#FFD740' }]} />
                        {/* Bar chart bars */}
                        <View style={[styles.bar, { height: 30, right: 60, bottom: 10, backgroundColor: '#4CAF50' }]} />
                        <View style={[styles.bar, { height: 45, right: 44, bottom: 10, backgroundColor: '#4CAF50' }]} />
                        <View style={[styles.bar, { height: 60, right: 28, bottom: 10, backgroundColor: '#4CAF50' }]} />
                        <View style={[styles.bar, { height: 80, right: 12, bottom: 10, backgroundColor: '#388E3C' }]} />
                        {/* Rocket body */}
                        <View style={styles.rocketBody} />
                        {/* Rocket tip */}
                        <View style={styles.rocketTip} />
                        {/* Rocket flame */}
                        <View style={styles.rocketFlameOrange} />
                        <View style={styles.rocketFlameRed} />
                        {/* Dollar signs */}
                        <Text style={[styles.dollarSign, { bottom: 55, right: 105 }]}>$</Text>
                        <Text style={[styles.dollarSign, { bottom: 30, right: 125, fontSize: 10 }]}>$</Text>
                    </View>
                </View>

                {/* ── Form ── */}
                <View style={styles.formCard}>
                    <Text style={styles.sectionTitle}>Add Product</Text>

                    {/* Product Name + Category row */}
                    <View style={styles.nameRow}>
                        <View style={styles.nameField}>
                            <Text style={styles.label}>Product Name</Text>
                            <TextInput
                                style={styles.input}
                                value={productName}
                                onChangeText={setProductName}
                                placeholder="Enter name"
                                placeholderTextColor="#BBB"
                            />
                        </View>

                        {/* Category dropdown */}
                        <View style={[styles.catField, { zIndex: 999 }]}>
                            <Text style={styles.label}>Category</Text>
                            <TouchableOpacity
                                style={styles.catDropBtn}
                                onPress={() => setShowCatDrop(!showCatDrop)}
                            >
                                <Text style={styles.catDropText}>{category}: All</Text>
                                <Text style={styles.catDropArrow}>{showCatDrop ? '▲' : '▼'}</Text>
                            </TouchableOpacity>
                            {showCatDrop && (
                                <View style={styles.catDropList}>
                                    {CATEGORIES.map(cat => (
                                        <TouchableOpacity
                                            key={cat}
                                            style={[styles.catDropOption, category === cat && styles.catDropOptionActive]}
                                            onPress={() => { setCategory(cat); setShowCatDrop(false); }}
                                        >
                                            <Text style={[styles.catDropOptionText, category === cat && styles.catDropOptionTextActive]}>
                                                {cat}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter description"
                        placeholderTextColor="#BBB"
                    />

                    {/* Price */}
                    <Text style={styles.label}>Price <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        placeholder="₹ 0"
                        placeholderTextColor="#BBB"
                    />

                    {/* Discount + Stack Quantity */}
                    <View style={styles.rowInputs}>
                        <View style={styles.inputHalf}>
                            <Text style={styles.label}>Discount</Text>
                            <TextInput
                                style={styles.input}
                                value={discount}
                                onChangeText={setDiscount}
                                keyboardType="numeric"
                                placeholder="0%"
                                placeholderTextColor="#BBB"
                            />
                        </View>
                        <View style={styles.inputHalf}>
                            <Text style={styles.label}>Stack Quantity</Text>
                            <TextInput
                                style={styles.input}
                                value={stock}
                                onChangeText={setStock}
                                keyboardType="numeric"
                                placeholder="0"
                                placeholderTextColor="#BBB"
                            />
                        </View>
                    </View>

                    {/* SKU */}
                    <Text style={styles.label}>SKU/Product Code</Text>
                    <TextInput
                        style={styles.input}
                        value={sku}
                        onChangeText={setSku}
                        placeholder="Enter SKU"
                        placeholderTextColor="#BBB"
                    />

                    {/* Upload box */}
                    <TouchableOpacity style={styles.uploadBox}>
                        <Feather name="upload" size={18} color="#888" style={{ marginBottom: 4 }} />
                        <Text style={styles.uploadTitle}>Upload Product Image</Text>
                        <Text style={styles.uploadSubtitle}>drag & drop or Click to Upload</Text>
                    </TouchableOpacity>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.addProductBtn} onPress={handleAddProduct}>
                            <Text style={styles.addProductBtnText}>Add Product</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F2F2F2' },

    // Header
    headerCard: {
        backgroundColor: '#EAF5EA',
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 16,
        padding: 16,
        overflow: 'hidden',
        minHeight: 160,
    },
    headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    logo: { width: 50, height: 30, resizeMode: 'contain' },
    welcomeText: { fontSize: 12, color: '#2f5d50', marginTop: 6 },
    vendorName: { fontSize: 16, fontWeight: 'bold', color: '#000', marginTop: 2 },
    avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#CCC' },
    illustration: {
        position: 'absolute', right: 0, bottom: 0,
        width: width * 0.55, height: 140,
    },
    illustrationContainer: {
        position: 'absolute', right: 0, bottom: 0,
        width: width * 0.55, height: 140,
    },
    coin: {
        position: 'absolute',
        borderRadius: 7,
    },
    bar: {
        position: 'absolute',
        width: 12,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    rocketBody: {
        position: 'absolute',
        bottom: 38, right: 110,
        width: 22, height: 38,
        backgroundColor: '#4CAF50',
        borderRadius: 11,
        transform: [{ rotate: '-45deg' }],
    },
    rocketTip: {
        position: 'absolute',
        bottom: 68, right: 106,
        width: 0, height: 0,
        borderLeftWidth: 11, borderRightWidth: 11, borderBottomWidth: 18,
        borderLeftColor: 'transparent', borderRightColor: 'transparent',
        borderBottomColor: '#388E3C',
        transform: [{ rotate: '-45deg' }],
    },
    rocketFlameOrange: {
        position: 'absolute',
        bottom: 22, right: 120,
        width: 10, height: 16,
        backgroundColor: '#FF8F00',
        borderBottomLeftRadius: 5, borderBottomRightRadius: 5,
        transform: [{ rotate: '-45deg' }],
    },
    rocketFlameRed: {
        position: 'absolute',
        bottom: 20, right: 123,
        width: 6, height: 10,
        backgroundColor: '#E53935',
        borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
        transform: [{ rotate: '-45deg' }],
    },
    dollarSign: {
        position: 'absolute',
        fontSize: 14, fontWeight: 'bold', color: '#F9A825',
    },

    // Form card
    formCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginTop: 14,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#000', marginBottom: 14 },

    // Name + Category row
    nameRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
    nameField: { flex: 1 },
    catField: { width: 120 },
    catDropBtn: {
        height: 45,
        backgroundColor: '#EFE4C9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5B567',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 0, // move upward
    },
    catDropText: { fontSize: 11, color: '#555', flex: 1 },
    catDropArrow: { fontSize: 9, color: '#555' },
    catDropList: {
        position: 'absolute', top: 68, left: 0, right: 0,
        backgroundColor: '#FFF', borderRadius: 8,
        borderWidth: 1, borderColor: '#E5B567',
        overflow: 'hidden', elevation: 6, zIndex: 999,
    },
    catDropOption: { paddingVertical: 10, paddingHorizontal: 12 },
    catDropOptionActive: { backgroundColor: '#FFF8EC' },
    catDropOptionText: { fontSize: 13, color: '#333' },
    catDropOptionTextActive: { color: '#E5A023', fontWeight: '700' },

    label: { fontSize: 13, fontWeight: '500', color: '#000', marginBottom: 4 },
    required: { color: '#D32F2F' },
    input: {
        height: 45, backgroundColor: '#EFE4C9', borderRadius: 8,
        borderWidth: 1, borderColor: '#E5B567',
        paddingHorizontal: 12, marginBottom: 12, color: '#000', fontSize: 14,
    },
    rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
    inputHalf: { width: '48%' },

    uploadBox: {
        height: 75, backgroundColor: '#FAFAFA', borderRadius: 10,
        borderWidth: 1.5, borderColor: '#E5B567', borderStyle: 'dashed',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 4, marginBottom: 16,
    },
    uploadTitle: { fontWeight: '600', color: '#333', fontSize: 13 },
    uploadSubtitle: { fontSize: 11, color: '#888', marginTop: 2 },

    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    addProductBtn: { flex: 1, backgroundColor: '#000', paddingVertical: 13, borderRadius: 10, alignItems: 'center' },
    addProductBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
    cancelBtn: { flex: 1, backgroundColor: '#F3F3F3', paddingVertical: 13, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#DDD' },
    cancelBtnText: { color: '#000', fontWeight: '700', fontSize: 14 },
});

export default VendorAddProductScreen;