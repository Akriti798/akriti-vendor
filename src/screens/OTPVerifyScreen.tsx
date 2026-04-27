import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerify'>;

const { width } = Dimensions.get('window');

const OTPVerifyScreen: React.FC<Props> = ({ route, navigation }) => {
    const { mobileNumber } = route.params;
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(28);
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

    const maskMobile = (number: string) => {
        if (!number) return '+91-74XXXXXXXX';
        const cleanNumber = number.replace(/\D/g, '');
        if (cleanNumber.length < 10) return `+91-${number}`;
        return `+91-${cleanNumber.slice(0, 2)}XXXXXXXX`;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Top Faded Text */}
            <Text style={styles.topFadedText}>OTP Verify</Text>

            {/* Header Row */}
            <View style={styles.headerRow}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backIcon}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Verify OTP</Text>
            </View>

            {/* Main Content Centered */}
            <View style={styles.contentWrapper}>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Verify OTP</Text>
                    <Text style={styles.subtitle}>Send To {maskMobile(mobileNumber)}</Text>

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
                                    secureTextEntry={true} // For dot display
                                />
                                {!digit && <View style={styles.dotPlaceholder} />}
                            </View>
                        ))}
                    </View>

                    {/* Resend Timer */}
                    <Text style={styles.timerText}>
                        Resend OTP in <Text style={styles.timerHighlight}>{formatTime(timer)}</Text>
                    </Text>

                    {/* Verify Button */}
                    <TouchableOpacity 
                        style={styles.verifyButton}
                        onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
                    >
                        <Text style={styles.verifyButtonText}>Verify</Text>
                    </TouchableOpacity>

                    {/* Change Number Text */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.changeNumberText}>Change Number</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    topFadedText: {
        fontSize: 12,
        color: '#BDBDBD',
        marginLeft: 16,
        marginTop: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 16,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    headerTitle: {
        color: '#FF7A00',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    mainContainer: {
        alignItems: 'center',
        paddingBottom: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#444',
        marginBottom: 20,
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    otpBox: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 6,
        position: 'relative',
    },
    otpInput: {
        width: '100%',
        height: '100%',
        fontSize: 20,
        color: '#000',
        padding: 0,
        zIndex: 2,
    },
    dotPlaceholder: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#333',
        position: 'absolute',
        zIndex: 1,
    },
    timerText: {
        fontSize: 13,
        color: '#333',
        marginTop: 15,
        textAlign: 'center',
    },
    timerHighlight: {
        color: '#FF7A00',
        fontWeight: '500',
    },
    verifyButton: {
        backgroundColor: '#28A745',
        height: 48,
        width: width * 0.8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },
    verifyButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    changeNumberText: {
        color: '#28A745',
        fontSize: 14,
        marginTop: 15,
        textAlign: 'center',
    },
});

export default OTPVerifyScreen;
