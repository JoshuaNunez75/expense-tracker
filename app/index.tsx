import { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";

export default function Index() {
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  function addExpense() {
    if (amount.trim() === "") {
      return;
    }
    setExpenses([...expenses, amount]);
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
      <Button title="Add Expense" onPress={addExpense} />

      <View style={{ marginTop: 20 }}>
        {expenses.map((expense, index) => (
          <Text key={index}>${expense}</Text>
        ))}
      </View>
    </View>
  );
}