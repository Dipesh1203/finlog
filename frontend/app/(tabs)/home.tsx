import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyTransactions = [
    {
        id: '1',
        title: 'Groceries',
        amount: -50.99,
        date: '2025-09-06',
        category: 'Food',
    },
    {
        id: '2',
        title: 'Salary',
        amount: 3000.00,
        date: '2025-09-05',
        category: 'Income',
    },
    {
        id: '3',
        title: 'Internet Bill',
        amount: -89.99,
        date: '2025-09-04',
        category: 'Bills',
    },
];

const Home = () => {
    const router = useRouter();
    const [balance] = useState(2450.75);
    const [monthlyBudget] = useState(5000);

    const getSpendingStatus = () => {
        const percentage = (balance / monthlyBudget) * 100;
        if (percentage > 75) return { text: 'On Track', color: 'text-green-600' };
        if (percentage > 50) return { text: 'Good', color: 'text-yellow-600' };
        return { text: 'Warning', color: 'text-red-600' };
    };

    const spendingStatus = getSpendingStatus();

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="px-6 pt-4 pb-6 bg-green-500 rounded-b-[30px]">
                    <Text className="text-white text-2xl font-bold mb-1">
                        Welcome back!
                    </Text>
                    <Text className="text-white opacity-80 mb-6">
                        Here's your financial overview
                    </Text>

                    {/* Balance Card */}
                    <View className="bg-white p-6 rounded-2xl shadow-sm">
                        <Text className="text-gray-600 mb-2">Current Balance</Text>
                        <Text className="text-4xl font-bold mb-4">
                            ${balance.toLocaleString()}
                        </Text>
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="text-gray-600 text-sm">Monthly Budget</Text>
                                <Text className="text-lg font-semibold">
                                    ${monthlyBudget.toLocaleString()}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-gray-600 text-sm">Status</Text>
                                <Text className={`font-semibold ${spendingStatus.color}`}>
                                    {spendingStatus.text}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Quick Actions */}
                <View className="flex-row justify-between px-6 mt-6">
                    <TouchableOpacity
                        onPress={() => router.push('/expense/new')}
                        className="bg-green-100 p-4 rounded-xl flex-1 mr-3"
                    >
                        <Text className="text-green-800 font-semibold text-center">
                            Add Expense
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/(tabs)/list')}
                        className="bg-blue-100 p-4 rounded-xl flex-1 ml-3"
                    >
                        <Text className="text-blue-800 font-semibold text-center">
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Transactions */}
                <View className="px-6 mt-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold">Recent Transactions</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/list')}>
                            <Text className="text-green-600">See All</Text>
                        </TouchableOpacity>
                    </View>

                    {dummyTransactions.map((transaction) => (
                        <TouchableOpacity
                            key={transaction.id}
                            onPress={() => router.push(`/expense/${transaction.id}`)}
                            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
                        >
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="font-semibold">{transaction.title}</Text>
                                    <Text className="text-gray-500 text-sm">
                                        {transaction.category}
                                    </Text>
                                </View>
                                <Text
                                    className={`text-lg font-bold ${transaction.amount > 0
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                        }`}
                                >
                                    {transaction.amount > 0 ? '+' : ''}$
                                    {Math.abs(transaction.amount).toFixed(2)}
                                </Text>
                            </View>
                            <Text className="text-gray-400 text-sm mt-1">
                                {transaction.date}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bottom Spacing */}
                <View className="h-6" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;