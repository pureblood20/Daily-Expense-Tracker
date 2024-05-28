import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Features/ExpenseReducer/expenseSlice";

const store = configureStore({
  reducer: {
    expenseState: expenseReducer,
  },
});

export default store;
