import { useState } from "react";
import { Button, Keyboard, Pressable, Text, TextInput, View, ScrollView } from "react-native";
type Expense = {
  amount: string;
  category: string;
  note: string;
};

const CATEGORIES = ["Food", "Transport", "Fun", "Other"];

export default function Index() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [note, setNote] = useState("");

  function addExpense() {
    if (amount.trim() === "") {
      return;
    }
    setExpenses([...expenses, { amount, category, note }]);
    setAmount("");
    setNote("");
    Keyboard.dismiss();
  }

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

      <View style={{ marginTop: 20 }}>
        {expenses.map((expense, index) => (
          <Text key={index}>
            ${expense.amount} - {expense.category}{expense.note ? ` (${expense.note})` : ""}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}