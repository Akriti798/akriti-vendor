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
    FlatList,
    Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VendorCategorySelection'>;

const { height } = Dimensions.get('window');

const CATEGORIES = [
    "Fashion & Accessories > Fashion Accessories > Accessory Gift Set",
    "Beauty & Cosmetics > Face Care > Acne & Blackhead Fixers",
    "Books > Fiction Books > Action & Adventure Books",
    "Toys & Games > Action Figures",
    "Books > Activity Books for Adults",
    "Stationery Needs > Glue & Tapes > Adhesive Tapes",
    "Pet Care > Cat Needs > Adult Cat Food",
    "Pharma & Wellness > Adult Diapers",
    "Pet Care > Dog Needs > Adult Dog Food",
    "Pharma & Wellness > Sexual Wellness > Adult Games",
    "Tea, Coffee & Milk Drinks > Milk Drinks > Adult Milk Drinks",
    "Personal Care > Women's Grooming > After Shave",
];

const VendorCategorySelectionScreen: React.FC<Props> = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const renderItem = ({ item }: { item: string }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Top Faded Title */}
            <Text style={styles.topFadedTitle}>CATEGORIES</Text>

            {/* Seller Hub Header */}
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.headerTitle}>Seller hub</Text>
                    <Text style={styles.headerSubtitle}>by FROOKOON</Text>
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

            {/* Bottom Sheet Container */}
            <View style={styles.bottomSheet}>
                {/* Search Bar + Close Icon */}
                <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder="Search categories"
                            placeholderTextColor="#888"
                            value={search}
                            onChangeText={setSearch}
                            style={styles.searchInput}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.closeIcon}>✕</Text>
                    </TouchableOpacity>
                </View>

                {/* Category List */}
                <FlatList
                    data={CATEGORIES}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />

                {/* Done Button */}
                <TouchableOpacity 
                    style={styles.doneButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#EDEDED',
    },
    topFadedTitle: {
        fontSize: 14,
        color: '#BDBDBD',
        marginLeft: 16,
        marginTop: 10,
    },
    headerContainer: {
        backgroundColor: '#E6C16A',
        height: 65,
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 4,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    headerSubtitle: {
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
    bottomSheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -10,
        padding: 15,
        flex: 1,
        maxHeight: height * 0.8,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    searchContainer: {
        flex: 1,
        height: 45,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    searchInput: {
        fontSize: 14,
        color: '#000',
        padding: 0,
    },
    closeIcon: {
        fontSize: 18,
        color: '#000',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    list: {
        marginTop: 15,
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    },
    categoryItem: {
        marginBottom: 15,
    },
    categoryText: {
        fontSize: 13,
        color: '#000',
        lineHeight: 20,
    },
    doneButton: {
        backgroundColor: '#000',
        paddingHorizontal: 16,
        height: 35,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    doneButtonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500',
    },
});

export default VendorCategorySelectionScreen;
