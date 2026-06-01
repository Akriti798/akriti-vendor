import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    VendorSplash: undefined;
    VendorLogin: undefined;
    VendorRegister: undefined;
    VendorRegisterOTP: { mobileNumber: string };
    OTPVerify: { mobileNumber: string };
    VendorBusinessDetails: { selectedCategories?: string[] } | undefined;
    VendorCategorySelection: { selectedCategories?: string[] } | undefined;
    VendorSellerDetails: undefined;
    VendorBankDetails: undefined;
    VendorBrandDetails: undefined;
    VendorShippingLocation: undefined;

    VendorProfile: undefined;
    MainApp: NavigatorScreenParams<TabStackParamList>;
};

export type TabStackParamList = {
    Home: undefined;
    Categories: undefined;
    Orders: NavigatorScreenParams<OrdersStackParamList>;
    Products: NavigatorScreenParams<ProductsStackParamList>;
    Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type OrdersStackParamList = {
    VendorOrders: undefined;
    VendorOrderDetail: { orderId: string };
};

export type ProductsStackParamList = {
   VendorProductList: { updatedProduct?: Product; newProduct?: Product } | undefined;
    VendorAddProduct: undefined;
    VendorEditProduct: { productId: string };
};

export type ProfileStackParamList = {
    VendorProfile: undefined;
    VendorTransactions: undefined;
    Withdraw: undefined;
    EarningDashboard: undefined;
    RefundTransactions: undefined;
    SettingsDashboard: undefined;
    StoreSetting: undefined;
};