import React, { useState } from 'react';
import { StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        monthlyBudget: 5000,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [tempProfile, setTempProfile] = useState(profile);

    const handleSave = () => {
        setProfile(tempProfile);
        setIsEditing(false);
    };

    const stats = [
        { label: 'Total Expenses', value: '$2,450' },
        { label: 'Monthly Average', value: '$1,230' },
        { label: 'Budget Used', value: '49%' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="light-content" backgroundColor="#22c55e" />
            {/* Profile Header */}
            <View className="bg-green-500 p-6 rounded-b-3xl">
                <View className="items-center">
                    <View className="w-24 h-24 bg-white rounded-full mb-4 items-center justify-center">
                        <Text className="text-3xl">
                            {profile.name.charAt(0)}
                        </Text>
                    </View>
                    <Text className="text-white text-2xl font-bold">
                        {profile.name}
                    </Text>
                    <Text className="text-white opacity-75">
                        {profile.email}
                    </Text>
                </View>
            </View>

            {/* Statistics */}
            <View className="flex-row justify-around p-4 mt-4">
                {stats.map((stat, index) => (
                    <View key={index} className="items-center">
                        <Text className="text-gray-600">{stat.label}</Text>
                        <Text className="text-xl font-bold">{stat.value}</Text>
                    </View>
                ))}
            </View>

            {/* Profile Details */}
            <View className="p-6">
                <View className="bg-white rounded-xl p-4 shadow-sm">
                    {isEditing ? (
                        <>
                            <Text className="text-gray-600 mb-2">Name</Text>
                            <TextInput
                                className="border border-gray-200 rounded-lg p-2 mb-4"
                                value={tempProfile.name}
                                onChangeText={(text) =>
                                    setTempProfile({ ...tempProfile, name: text })
                                }
                            />
                            <Text className="text-gray-600 mb-2">Email</Text>
                            <TextInput
                                className="border border-gray-200 rounded-lg p-2 mb-4"
                                value={tempProfile.email}
                                onChangeText={(text) =>
                                    setTempProfile({ ...tempProfile, email: text })
                                }
                            />
                            <Text className="text-gray-600 mb-2">Monthly Budget</Text>
                            <TextInput
                                className="border border-gray-200 rounded-lg p-2 mb-4"
                                value={tempProfile.monthlyBudget.toString()}
                                onChangeText={(text) =>
                                    setTempProfile({
                                        ...tempProfile,
                                        monthlyBudget: parseFloat(text) || 0,
                                    })
                                }
                                keyboardType="numeric"
                            />
                            <TouchableOpacity
                                className="bg-green-500 py-3 rounded-lg"
                                onPress={handleSave}
                            >
                                <Text className="text-white text-center font-bold">
                                    Save Changes
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                className="bg-gray-100 py-3 rounded-lg mb-4"
                                onPress={() => setIsEditing(true)}
                            >
                                <Text className="text-center text-gray-600">
                                    Edit Profile
                                </Text>
                            </TouchableOpacity>
                            <View className="mb-4">
                                <Text className="text-gray-600">Monthly Budget</Text>
                                <Text className="text-2xl font-bold">
                                    ${profile.monthlyBudget.toLocaleString()}
                                </Text>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Profile;