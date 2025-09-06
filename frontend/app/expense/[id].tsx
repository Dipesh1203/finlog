import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExpenseView = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    // In a real app, we would fetch the expense details using the id
    const expense = {
        id: id as string,
        title: 'Groceries',
        amount: 50.99,
        category: 'Food',
        date: '2025-09-06',
        notes: 'Weekly grocery shopping at Walmart',
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
            <ScrollView className="flex-1">
                <View className="p-6">
                    {/* Header */}
                    <View className="mb-6">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="mb-4"
                        >
                            <Text className="text-green-600">← Back</Text>
                        </TouchableOpacity>
                        <Text className="text-2xl font-bold">Expense Details</Text>
                    </View>

                    {/* Expense Card */}
                    <View className="bg-white p-6 rounded-xl shadow-sm">
                        <View className="mb-6">
                            <Text className="text-4xl font-bold text-green-600">
                                ${expense.amount.toFixed(2)}
                            </Text>
                        </View>

                        <View className="space-y-4">
                            <View>
                                <Text className="text-gray-500">Title</Text>
                                <Text className="text-lg font-semibold">
                                    {expense.title}
                                </Text>
                            </View>

                            <View>
                                <Text className="text-gray-500">Category</Text>
                                <Text className="text-lg font-semibold">
                                    {expense.category}
                                </Text>
                            </View>

                            <View>
                                <Text className="text-gray-500">Date</Text>
                                <Text className="text-lg font-semibold">
                                    {expense.date}
                                </Text>
                            </View>

                            {expense.notes && (
                                <View>
                                    <Text className="text-gray-500">Notes</Text>
                                    <Text className="text-lg">
                                        {expense.notes}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row space-x-4 mt-6">
                        <TouchableOpacity
                            className="flex-1 bg-green-500 py-4 rounded-xl"
                            onPress={() => router.push(`/expense/edit/${id}`)}
                        >
                            <Text className="text-white text-center font-bold">
                                Edit
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 bg-red-500 py-4 rounded-xl"
                            onPress={() => {
                                // TODO: Implement delete functionality
                                router.back();
                            }}
                        >
                            <Text className="text-white text-center font-bold">
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ExpenseView;