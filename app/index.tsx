import { useState, useEffect } from "react";
import { Button, Keyboard, Pressable, Text, TextInput, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Expense = {
  amount: string;
  category: string;
  note: string;
};

const CATEGORIES = ["Food", "Transport", "Fun", "Other"];
const STORAGE_KEY = "expenses";

export default function Index() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  function addExpense() {
    if (amount.trim() === "") {
      return;
    }
    setExpenses([...expenses, { amount, category, note }]);
    setAmount("");
    setNote("");
    Keyboard.dismiss();
  }

  
  function deleteExpense(indexToDelete: number) {
    setExpenses(expenses.filter((_, index) => index !== indexToDelete));
  }

  const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: "center", padding: 20, paddingTop: 60 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <Text style={{ fontWeight: "600", marginBottom: 4 }}>Amount</Text>
      <TextInput
        placeholder="e.g $10.00"
        placeholderTextColor="#999"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={addExpense}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, width: 200, marginBottom: 10 }}
      />

      <Text style={{ fontWeight: "600", marginBottom: 4 }}>Note (optional)</Text>
      <TextInput
        placeholder="e.g. lunch, taxi, etc."
        placeholderTextColor="#999"
        value={note}
        onChangeText={setNote}
        returnKeyType="done"
        onSubmitEditing={addExpense}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, width: 200, marginBottom: 10 }}
      />

      <Text style={{ fontWeight: "600", marginBottom: 4 }}>Category</Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategory(cat)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              marginHorizontal: 4,
              borderRadius: 6,
              backgroundColor: category === cat ? "#3d6b8a" : "#eee",
            }}
          >
            <Text style={{ color: category === cat ? "#fff" : "#333" }}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <Button title="Add Expense" onPress={addExpense} />

      <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 20 }}>
        Total: ${total.toFixed(2)}
      </Text>
      <View style={{ marginTop: 20, width: "100%" }}>
        {expenses.map((expense, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingVertical: 4,
            }}
          >
            <Text>
              ${expense.amount} - {expense.category}{expense.note ? ` (${expense.note})` : ""}
            </Text>
            <Pressable onPress={() => deleteExpense(index)}>
              <Text style={{ color: "red", marginLeft: 10 }}>✕</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}