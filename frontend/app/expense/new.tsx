import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
    { id: '1', name: 'Food', color: '#FF6B6B' },
    { id: '2', name: 'Transportation', color: '#4ECDC4' },
    { id: '3', name: 'Shopping', color: '#45B7D1' },
    { id: '4', name: 'Bills', color: '#96CEB4' },
    { id: '5', name: 'Entertainment', color: '#FFEEAD' },
    { id: '6', name: 'Other', color: '#D4D4D4' },
];

const NewExpense = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        // TODO: Implement expense saving logic
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
            <ScrollView className="flex-1">
                <View className="p-6">
                    <Text className="text-2xl font-bold mb-6">Add New Expense</Text>

                    <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
                        <Text className="text-gray-600 mb-2">Title</Text>
                        <TextInput
                            className="border border-gray-200 rounded-lg p-2 mb-4"
                            value={title}
                            onChangeText={setTitle}
                            placeholder="What did you spend on?"
                        />

                        <Text className="text-gray-600 mb-2">Amount</Text>
                        <TextInput
                            className="border border-gray-200 rounded-lg p-2 mb-4"
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="0.00"
                            keyboardType="numeric"
                        />

                        <Text className="text-gray-600 mb-2">Category</Text>
                        <View className="flex-row flex-wrap gap-2 mb-4">
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    onPress={() => setCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full ${category === cat.id ? 'bg-green-500' : 'bg-gray-200'
                                        }`}
                                >
                                    <Text
                                        className={`${category === cat.id ? 'text-white' : 'text-gray-700'
                                            }`}
                                    >
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text className="text-gray-600 mb-2">Notes (Optional)</Text>
                        <TextInput
                            className="border border-gray-200 rounded-lg p-2 mb-4"
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="Add any additional notes"
                            multiline
                            numberOfLines={3}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        className="bg-green-500 py-4 rounded-xl"
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            Save Expense
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NewExpense;
