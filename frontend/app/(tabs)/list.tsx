import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyExpenses = [
    {
        id: '1',
        title: 'Groceries',
        amount: 50.99,
        category: 'Food',
        date: '2025-09-06',
    },
    {
        id: '2',
        title: 'Gas',
        amount: 45.00,
        category: 'Transportation',
        date: '2025-09-05',
    },
    // Add more dummy data as needed
];

const ExpenseList = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [expenses] = useState(dummyExpenses);

    const renderExpenseItem = ({ item }: { item: Expense }) => (
        <TouchableOpacity
            className="bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={() => router.push(`/expense/${item.id}`)}
        >
            <View className="flex-row justify-between items-center">
                <View>
                    <Text className="text-lg font-semibold">{item.title}</Text>
                    <Text className="text-gray-500">{item.category}</Text>
                    <Text className="text-gray-400 text-sm">{item.date}</Text>
                </View>
                <Text className="text-xl font-bold text-green-600">
                    ${item.amount.toFixed(2)}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="light-content" backgroundColor="#22c55e" />
            <View className="bg-green-500">
                <Text className="text-white text-2xl font-bold mx-2 mb-4">Expenses</Text>
                <TextInput
                    className="bg-white rounded-lg p-2 mx-2 mb-2"
                    placeholder="Search expenses..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={expenses.filter(expense =>
                    expense.title.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                renderItem={renderExpenseItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500 mt-4">
                        No expenses found
                    </Text>
                }
            />

            <TouchableOpacity
                className="absolute bottom-6 right-6 bg-green-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
                onPress={() => router.push('/expense/new')}
            >
                <Text className="text-white text-3xl">+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ExpenseList;