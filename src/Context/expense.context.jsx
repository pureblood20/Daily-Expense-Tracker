import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { query, where, getDocs, and, or } from "firebase/firestore";
import { db } from "../firebase.config";

const appContext = createContext();

const AppProvider = ({ children }) => {
  const [expenseDetails, setExpenseDetails] = useState({
    email: "shiv@gmail.com",

    amount: "",

    category: "",

    date: "",

    title: "",
  });

  const [displayExpenseTable, setDisplayExpenseTable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const year = 2024;

  const addExpense = async () => {
    const docRef = await addDoc(collection(db, "Expense"), {
      ...expenseDetails,
      date: new Date(expenseDetails.date),
    });
  };

  const displayExpense = async () => {
    let q;

    if (selectedCategory && !selectedMonth?.length) {
      q = query(
        collection(db, "Expense"),

        where("email", "==", expenseDetails.email),
        where("category", "==", selectedCategory)
      );

      const snapshot = await getDocs(q);
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setDisplayExpenseTable((n) => [...n, ...data]);
      return;
    } else if (selectedMonth?.length) {
      selectedMonth.map(async (item) => {
        let month = item.value;

        const startDate = new Date(year, parseInt(month), 1);
        const endDate = new Date(year, parseInt(month) + 1, 0);

        if (month && selectedCategory) {
          q = query(
            collection(db, "Expense"),

            where("email", "==", expenseDetails.email),
            where("date", ">=", startDate),
            where("date", "<", endDate),
            where("category", "==", selectedCategory)
          );
        }
        if (month && !selectedCategory) {
          q = query(
            collection(db, "Expense"),

            where("email", "==", expenseDetails.email),
            where("date", ">=", startDate),
            where("date", "<", endDate)
          );
        }

        const snapshot = await getDocs(q);
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setDisplayExpenseTable((n) => [...n, ...data]);
      });
    } else {
      const startDate = new Date(year, parseInt(new Date().getMonth()), 1);
      const endDate = new Date(year, parseInt(new Date().getMonth()) + 1, 0);
      q = query(
        collection(db, "Expense"),
        where("email", "==", expenseDetails.email),
        where("date", ">=", startDate),
        where("date", "<", endDate)
      );
      const snapshot = await getDocs(q);
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setDisplayExpenseTable((n) => [...n, ...data]);
    }
  };

  useEffect(() => {
    setTotalAmount(
      displayExpenseTable.reduce(
        (acc, expense) => acc + Number(expense.amount),
        0
      )
    );
  }, [displayExpenseTable]);

  return (
    <appContext.Provider
      value={{
        category,
        expenseDetails,
        setExpenseDetails,
        addExpense,
        displayExpense,
        displayExpenseTable,
        setSelectedMonth,
        selectedMonth,
        setSelectedCategory,
        selectedCategory,
        totalAmount,
        setDisplayExpenseTable,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

const useExpenseContext = () => useContext(appContext);

export { AppProvider, useExpenseContext };
