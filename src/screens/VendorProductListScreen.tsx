import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { ProductsStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

type VendorProductListNavigationProp = NativeStackNavigationProp<ProductsStackParamList, 'VendorProductList'>;
type VendorProductListRouteProp = RouteProp<ProductsStackParamList, 'VendorProductList'>;

interface Props {
    navigation: VendorProductListNavigationProp;
    route: VendorProductListRouteProp;
}

type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: string;
    stock: string;
    stockStatus: 'in_stock' | 'low_stock' | 'out_stock';
    isPublished: boolean;
};

const STOCK_LABELS = {
    in_stock:  { label: 'Active',    color: '#fff', bg: '#2e8b57' },
    low_stock: { label: 'Low Stock', color: '#fff', bg: '#F57C00' },
    out_stock: { label: 'No Stock',  color: '#fff', bg: '#D32F2F' },
};

const INITIAL_PRODUCTS: Product[] = [
    { id: '1', name: 'Mixed Dry Fruits', category: 'Dry Fruits', description: 'Premium quality mixed dry fruits', price: '30', stock: '50', stockStatus: 'in_stock', isPublished: true },
    { id: '2', name: 'Mixed Dry Fruits', category: 'Dry Fruits', description: 'Premium quality mixed dry fruits', price: '30', stock: '50', stockStatus: 'in_stock', isPublished: true },
    { id: '3', name: 'Mixed Dry Fruits', category: 'Dry Fruits', description: 'Premium quality mixed dry fruits', price: '30', stock: '50', stockStatus: 'in_stock', isPublished: true },
    { id: '4', name: 'Mixed Dry Fruits', category: 'Dry Fruits', description: 'Premium quality mixed dry fruits', price: '30', stock: '50', stockStatus: 'low_stock', isPublished: false },
];

const VendorProductListScreen: React.FC<Props> = ({ navigation, route }) => {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [search, setSearch]     = useState('');

    // ── Receive updated product back from Edit screen ──
    useEffect(() => {
        const updated = route.params?.updatedProduct;
        if (updated) {
            setProducts(prev =>
                prev.map(p => p.id === updated.id ? { ...p, ...updated } : p)
            );
            navigation.setParams({ updatedProduct: undefined });
        }
    }, [route.params?.updatedProduct]);

    // ── Receive new product from Add screen ──
    useEffect(() => {
        const newProduct = route.params?.newProduct;
        if (newProduct) {
            setProducts(prev => [newProduct, ...prev]); // add to top of list
            navigation.setParams({ newProduct: undefined });
        }
    }, [route.params?.newProduct]);

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const renderProductItem = ({ item }: { item: Product }) => {
        const statusInfo = STOCK_LABELS[item.stockStatus];
        return (
            <View style={[styles.productCard, !item.isPublished && styles.productCardDimmed]}>
                {/* Unpublished banner */}
                {!item.isPublished && (
                    <View style={styles.unpublishedBanner}>
                        <Text style={styles.unpublishedText}>Unpublished</Text>
                    </View>
                )}

                <View style={styles.cardInner}>
                    {/* LEFT IMAGE */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.productImage}
                        />
                    </View>

                    {/* CENTER DETAILS */}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.categoryText}>{item.category}</Text>
                        <Text style={styles.stockText}>Stock: {item.stock}</Text>
                        <View style={styles.priceTag}>
                            <Text style={styles.priceText}>₹{item.price} Rs.</Text>
                        </View>
                    </View>

                    {/* RIGHT ACTIONS */}
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('VendorEditProduct', { productId: item.id })}
                        >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>

                        <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                            <Text style={[styles.statusBadgeText, { color: statusInfo.color }]}>
                                {statusInfo.label}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    {/* TOP HEADER CONTAINER */}
                    <View style={styles.headerCard}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                            style={styles.headerLogo}
                        />
                        <View style={styles.headerRow}>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                <Feather name="arrow-left" size={22} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Product List</Text>
                        </View>

                        {/* SEARCH + ADD PRODUCT ROW */}
                        <View style={styles.searchAddRow}>
                            <View style={styles.searchBar}>
                                <Feather name="search" size={18} color="#888" style={{ marginRight: 6 }} />
                                <TextInput
                                    placeholder="Search products..."
                                    placeholderTextColor="#888"
                                    style={styles.searchInput}
                                    value={search}
                                    onChangeText={setSearch}
                                />
                                {search.length > 0 && (
                                    <TouchableOpacity onPress={() => setSearch('')}>
                                        <Feather name="x" size={16} color="#999" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <TouchableOpacity
                                style={styles.addProductButton}
                                onPress={() => navigation.navigate('VendorAddProduct')}
                            >
                                <Text style={styles.addProductText}>Add Product</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* PRODUCT LIST */}
                    {filtered.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No products found</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={filtered}
                            renderItem={renderProductItem}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#f2f2f2' },
    mainContainer: { paddingHorizontal: 16 },
    headerCard: { backgroundColor: '#f5f5f5', borderRadius: 16, padding: 16, marginTop: 10, marginBottom: 10 },
    headerLogo: { width: 40, height: 40, resizeMode: 'contain', marginBottom: 10 },
    headerRow: { flexDirection: 'row', alignItems: 'center' },
    backButton: { marginRight: 8 },
    headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
    searchAddRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    searchBar: {
        width: '60%', height: 40, backgroundColor: '#fff', borderRadius: 8,
        borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
    },
    searchInput: { flex: 1, fontSize: 14, color: '#000', padding: 0 },
    addProductButton: { backgroundColor: '#ff7a00', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
    addProductText: { color: 'white', fontWeight: '600', fontSize: 14 },

    // Card
    productCard: {
        backgroundColor: '#fff', borderRadius: 12, borderWidth: 1,
        borderColor: '#d6d6d6', marginBottom: 12, overflow: 'hidden',
    },
    productCardDimmed: { borderColor: '#F5A623', opacity: 0.88 },
    unpublishedBanner: { backgroundColor: '#FFF3E0', paddingHorizontal: 12, paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#FFE0B2' },
    unpublishedText: { fontSize: 11, color: '#F57C00', fontWeight: '600' },
    cardInner: { flexDirection: 'row', alignItems: 'center', padding: 12 },
    imageContainer: { width: 70, height: 70, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginRight: 12, overflow: 'hidden' },
    productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    detailsContainer: { flex: 1 },
    productName: { fontSize: 16, fontWeight: '600', color: '#000' },
    categoryText: { fontSize: 13, color: '#666', marginTop: 2 },
    stockText: { fontSize: 13, color: '#666', marginTop: 2 },
    priceTag: { backgroundColor: '#ff9b3d', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 6, alignSelf: 'flex-start' },
    priceText: { color: 'white', fontSize: 12, fontWeight: '600' },
    actionsContainer: { alignItems: 'flex-end', justifyContent: 'space-between', height: 70 },
    editButton: { backgroundColor: '#e6e6e6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    editButtonText: { color: '#000', fontSize: 12, fontWeight: '500' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    statusBadgeText: { fontSize: 12, fontWeight: '600' },

    emptyState: { alignItems: 'center', marginTop: 60 },
    emptyText: { fontSize: 15, color: '#999' },
});

export default VendorProductListScreen;