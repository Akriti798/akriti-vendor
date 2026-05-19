import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    VendorSplash: undefined;
    VendorLogin: undefined;
    VendorRegister: undefined;
    VendorRegisterOTP: { mobileNumber: string };
    OTPVerify: { mobileNumber: string };
    VendorBusinessDetails: undefined;
    VendorCategorySelection: undefined;
    VendorSellerDetails: undefined;
    VendorBankDetails: undefined;
    VendorBrandDetails: undefined;
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
    VendorProductList: undefined;
    VendorAddProduct: undefined;
    VendorEditProduct: { productId: string };
};

export type ProfileStackParamList = {
    VendorProfile: undefined;
    VendorTransactions: undefined;
};
