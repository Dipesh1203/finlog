import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { ExpenseService } from '../services';
import { Expense } from '../types';

interface AddEditExpenseScreenProps {
  navigation: any;
  route: any;
}

const AddEditExpenseScreen: React.FC<AddEditExpenseScreenProps> = ({ navigation, route }) => {
  const { expense } = route.params || {};
  const isEditing = !!expense;

  const [formData, setFormData] = useState({
    description: expense?.description || '',
    amount: expense?.amount?.toString() || '',
    categories: expense?.categories?.join(', ') || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.description || !formData.amount) {
      Alert.alert('Error', 'Please fill in description and amount');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const expenseData: Omit<Expense, 'id' | 'sender'> = {
      description: formData.description.trim(),
      amount,
      date: new Date().toISOString(),
      categories: formData.categories
        .split(',')
        .map(cat => cat.trim())
        .filter(cat => cat.length > 0),
    };

    setLoading(true);
    try {
      if (isEditing) {
        await ExpenseService.updateExpense(expense.id!, expenseData);
        Alert.alert('Success', 'Expense updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        await ExpenseService.createExpense(expenseData);
        Alert.alert('Success', 'Expense created successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error: any) {
      Alert.alert('Error', `Failed to ${isEditing ? 'update' : 'create'} expense`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {isEditing ? 'Edit Expense' : 'Add New Expense'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter expense description"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount *</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={formData.amount}
              onChangeText={(text) => setFormData({ ...formData, amount: text })}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categories (comma separated)</Text>
            <TextInput
              style={styles.input}
              placeholder="food, transportation, entertainment"
              value={formData.categories}
              onChangeText={(text) => setFormData({ ...formData, categories: text })}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>
              Separate multiple categories with commas
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, loading && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>
                  {isEditing ? 'Update' : 'Save'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  helperText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#95a5a6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
});

export default AddEditExpenseScreen;