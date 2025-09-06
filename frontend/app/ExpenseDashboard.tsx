import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExpenseDashboard = () => {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [monthlyBudget, setMonthlyBudget] = useState(5000);
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="light-content" backgroundColor="#22c55e" />
            {/* Header */}
            <View className="bg-green-500 p-6 rounded-b-3xl">
                <Text className="text-white text-2xl font-bold mb-2">Expense Dashboard</Text>
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-white text-sm">Total Expenses</Text>
                        <Text className="text-white text-3xl font-bold">${totalExpenses}</Text>
                    </View>
                    <View>
                        <Text className="text-white text-sm">Monthly Budget</Text>
                        <Text className="text-white text-3xl font-bold">${monthlyBudget}</Text>
                    </View>
                </View>
            </View>

            {/* Quick Actions */}
            <View className="flex-row justify-around p-4 mt-4">
                <TouchableOpacity
                    className="bg-white p-4 rounded-xl w-[45%] items-center shadow-sm"
                    onPress={() => router.push('/expense/new')}
                >
                    <Text className="text-lg font-semibold text-green-600">Add Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-white p-4 rounded-xl w-[45%] items-center shadow-sm"
                    onPress={() => router.push('/(tabs)/list')}
                >
                    <Text className="text-lg font-semibold text-green-600">View All</Text>
                </TouchableOpacity>
            </View>

            {/* Recent Expenses */}
            <View className="p-4 flex-1">
                <Text className="text-xl font-bold mb-4">Recent Expenses</Text>
                <ScrollView className="flex-1">
                    {/* We'll populate this with actual expense data later */}
                    <Text className="text-gray-500 text-center mt-4">No recent expenses</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ExpenseDashboard;