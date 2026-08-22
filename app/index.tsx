import { useState } from "react";
import { Text, TextInput, View, Button, Pressable } from "react-native";

type Expense = {
  amount: string;
  category: string;
};

const CATEGORIES = ["Food", "Transport", "Fun", "Other"];

export default function Index() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  function addExpense() {
    if (amount.trim() === "") {
      return;
    }
    setExpenses([...expenses, { amount, category }]);
    setAmount("");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <TextInput
        placeholder="Enter an amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, width: 200, marginBottom: 10 }}
      />

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
          <Text key={index}>${expense.amount} - {expense.category}</Text>
        ))}
      </View>
    </View>
  );
}