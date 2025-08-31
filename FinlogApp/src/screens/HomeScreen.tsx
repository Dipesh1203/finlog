import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { ExpenseService, AuthService } from '../services';
import { Expense } from '../types';

interface HomeScreenProps {
  navigation: any;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, onLogout }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadExpenses = useCallback(async () => {
    try {
      const data = await ExpenseService.getAllExpenses();
      setExpenses(data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Session Expired', 'Please login again', [
          { text: 'OK', onPress: onLogout }
        ]);
      } else {
        Alert.alert('Error', 'Failed to load expenses');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [onLogout]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadExpenses();
  }, [loadExpenses]);

  const handleDeleteExpense = async (id: string) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await ExpenseService.deleteExpense(id);
              setExpenses(expenses.filter(expense => expense.id !== id));
              Alert.alert('Success', 'Expense deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete expense');
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await AuthService.logout();
            onLogout();
          },
        },
      ]
    );
  };

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <View style={styles.expenseHeader}>
        <Text style={styles.expenseDescription}>{item.description}</Text>
        <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
      </View>
      <Text style={styles.expenseDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
      {item.categories && item.categories.length > 0 && (
        <View style={styles.categoriesContainer}>
          {item.categories.map((category, index) => (
            <Text key={index} style={styles.categoryTag}>
              {category}
            </Text>
          ))}
        </View>
      )}
      <View style={styles.expenseActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('AddEditExpense', { expense: item })}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteExpense(item.id!)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading expenses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Expenses</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Expenses:</Text>
        <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
      </View>

      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id!}
        contentContainerStyle={expenses.length === 0 ? styles.emptyContainer : styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No expenses found</Text>
            <Text style={styles.emptySubtext}>Tap the + button to add your first expense</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditExpense')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  logoutButton: {
    padding: 8,
  },
  logoutButtonText: {
    color: '#e74c3c',
    fontSize: 16,
  },
  totalContainer: {
    backgroundColor: '#3498db',
    padding: 20,
    alignItems: 'center',
  },
  totalLabel: {
    color: '#fff',
    fontSize: 16,
  },
  totalAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  listContainer: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95a5a6',
  },
  expenseItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  expenseDate: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryTag: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    fontSize: 12,
    color: '#2c3e50',
    marginRight: 5,
    marginBottom: 5,
  },
  expenseActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default HomeScreen;