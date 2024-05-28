import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebase.config";

export const displayExpense = createAsyncThunk(
  "expense/displayExpense",
  async ({ selectedCategory, selectedMonth, email }) => {
    let q;
    const year = 2024;
    if (selectedCategory && !selectedMonth?.length) {
      q = query(
        collection(db, "Expense"),

        where("email", "==", email),
        where("category", "==", selectedCategory)
      );

      const snapshot = await getDocs(q);
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      console.log(data, "fffffff");
      // state.expense = [...state.expense, ...data];

      return data;
    } else if (selectedMonth?.length) {
      console.log("dsdsd");

      const results = await Promise.all(
        selectedMonth.map(async (item) => {
          let month = item.value;

          const startDate = new Date(year, parseInt(month), 1);
          const endDate = new Date(year, parseInt(month) + 1, 0);

          if (month && selectedCategory) {
            q = query(
              collection(db, "Expense"),

              where("email", "==", email),
              where("date", ">=", startDate),
              where("date", "<", endDate),
              where("category", "==", selectedCategory)
            );
          }
          if (month && !selectedCategory) {
            q = query(
              collection(db, "Expense"),

              where("email", "==", email),
              where("date", ">=", startDate),
              where("date", "<", endDate)
            );
          }

          const snapshot = await getDocs(q);
          const data = [];
          snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });

          return data;
          // state.expense = [...state.expense, ...data];
        })
      );

      return results.flat();
    } else {
      const startDate = new Date(year, parseInt(new Date().getMonth()), 1);
      const endDate = new Date(year, parseInt(new Date().getMonth()) + 1, 0);
      q = query(
        collection(db, "Expense"),
        where("email", "==", email),
        where("date", ">=", startDate),
        where("date", "<", endDate)
      );
      const snapshot = await getDocs(q);
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      const updateData = data.map((item) => ({
        ...item,
        date: {
          seconds: item.date.seconds,
        },
      }));

      return updateData;
      // state.expense = [...state.expense, ...data];
    }

    console.log("hellooooo");
  }
);

const defaultState = {
  email: "shiv@gmail.com",

  amount: "",

  category: "",

  date: "",

  title: "",

  expense: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: defaultState,
  reducers: {
    addExpense: async (state, action) => {
      const { expenseDetails } = action.payload;
      const docRef = await addDoc(collection(db, "Expense"), {
        ...expenseDetails,
        date: new Date(expenseDetails.date),
      });
    },

    clearExpense: (state, action) => {
      state.expense = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(displayExpense.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        console.log(action.payload, "payload");
        state.expense = [...state.expense, ...action.payload];
      }

      // state.expense.push(...action.payload);
      // state.expense.push([1, 2, 3]);
      // console.log(state.expense);
      // state.expense.concat(...action.payload);
      // return {
      //   ...state,
      //   expense: [...state.expense, ...action.payload],
      // };
    });
  },
});

export const { addExpense, clearExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
