import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VendorRegisterOTP'>;

const VendorRegisterOTPScreen: React.FC<Props> = ({ route, navigation }) => {
    const { mobileNumber } = route.params;
    const [phone, setPhone] = useState(mobileNumber || '');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [ownerName, setOwnerName] = useState('');
    const [timer, setTimer] = useState(20);
    
    const otpRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (value: string, index: number) => {
        if (value.length > 1) {
            value = value.slice(-1);
        }
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleBackPress = (index: number, e: any) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        if (otp.every(digit => digit !== '')) {
            navigation.navigate('OTPVerify', { mobileNumber: phone });
        }
    }, [otp, navigation, phone]);

    const handleResendOtp = () => {
        if (timer === 0 && phone.length === 10) {
            setTimer(20);
            console.log('Resending OTP to:', phone);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        {/* Header Section */}
                        <View style={styles.headerContainer}>
                            <Image
                                source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772698012/logo_ws8i3j.png' }}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <View style={styles.titleRow}>
                                <Text style={styles.titleVendor}>VENDOR </Text>
                                <Text style={styles.titleRegistration}>REGISTRATION</Text>
                            </View>
                        </View>

                        {/* Phone Input Field */}
                        <View style={styles.phoneInputRow}>
                            <Image
                                source={{ uri: 'https://res.cloudinary.com/ddirrlngo/image/upload/v1772697939/india_flag_bifvus.png' }}
                                style={styles.flag}
                            />
                            <Text style={styles.countryCode}>+91</Text>
                            <View style={styles.verticalDivider} />
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="Enter the Mobile Number"
                                placeholderTextColor="#888"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="numeric"
                                maxLength={10}
                            />
                        </View>

                        {/* Send OTP Button - Dynamic Color and Interaction */}
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={handleResendOtp}
                            disabled={timer > 0 || phone.length !== 10}
                            style={[
                                styles.sendOtpButton, 
                                (timer === 0 && phone.length === 10) ? styles.sendOtpActive : styles.sendOtpDisabled
                            ]}
                        >
                            <Text style={styles.sendOtpText}>SEND OTP</Text>
                        </TouchableOpacity>

                        {/* OTP Input Boxes */}
                        <View style={styles.otpRow}>
                             {otp.map((digit, index) => (
                                <View key={index} style={styles.otpBox}>
                                    <TextInput
                                        ref={(el) => { otpRefs.current[index] = el; }}
                                        value={digit}
                                        onChangeText={(val) => handleOtpChange(val, index)}
                                        onKeyPress={(e) => handleBackPress(index, e)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        style={styles.otpInput}
                                        textAlign="center"
                                    />
                                </View>
                            ))}
                        </View>

                        {/* Resend Timer */}
                        <Text style={styles.timerText}>
                            Resend OTP in <Text style={styles.timerHighlight}>{formatTime(timer)}</Text>
                        </Text>

                        {/* Owner Name Section */}
                        <Text style={styles.fieldLabel}>Owner Name</Text>
                        <View style={styles.ownerInputContainer}>
                            <TextInput
                                placeholder="Enter Your Full Name"
                                placeholderTextColor="#888"
                                value={ownerName}
                                onChangeText={setOwnerName}
                                style={styles.ownerInput}
                            />
                        </View>

                        {/* Terms Text */}
                        <Text style={styles.termsText}>
                            By Signing Up, You Agree to the{' '}
                            <Text style={styles.termsHighlight}>Term & Condition</Text>
                        </Text>

                        {/* Divider Line */}
                        <View style={styles.divider} />

                        {/* Login Text */}
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('VendorLogin')}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.loginText}>
                                Already have an account ? <Text style={styles.loginHighlight}>Login Here</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 22,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginBottom: 12,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleVendor: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF7A00',
    },
    titleRegistration: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1B5E20',
    },
    phoneInputRow: {
        flexDirection: 'row',
        backgroundColor: '#F5E6CC',
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    flag: {
        width: 20,
        height: 15,
    },
    countryCode: {
        marginLeft: 8,
        fontSize: 15,
        color: '#000',
        fontWeight: '500',
    },
    verticalDivider: {
        width: 1,
        height: 25,
        backgroundColor: '#999',
        marginHorizontal: 12,
    },
    phoneInput: {
        flex: 1,
        fontSize: 15,
        color: '#333',
        padding: 0,
    },
    sendOtpButton: {
        height: 50,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    sendOtpDisabled: {
        backgroundColor: '#F4C7A1', // Light orange
    },
    sendOtpActive: {
        backgroundColor: '#FF7A00', // Dark orange
    },
    sendOtpText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    otpBox: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    otpInput: {
        width: '100%',
        height: '100%',
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        padding: 0,
    },
    timerText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 13,
        color: '#333',
    },
    timerHighlight: {
        color: '#FF7A00',
        fontWeight: '600',
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: 30,
        marginBottom: 8,
        color: '#000',
        fontWeight: '600',
    },
    ownerInputContainer: {
        backgroundColor: '#F5E6CC',
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    ownerInput: {
        fontSize: 15,
        color: '#333',
        padding: 0,
    },
    termsText: {
        fontSize: 12,
        color: '#777',
        marginTop: 15,
        textAlign: 'center',
    },
    termsHighlight: {
        color: '#FF7A00',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 20,
    },
    loginText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
    },
    loginHighlight: {
        color: '#FF7A00',
        fontWeight: 'bold',
    },
});

export default VendorRegisterOTPScreen;
