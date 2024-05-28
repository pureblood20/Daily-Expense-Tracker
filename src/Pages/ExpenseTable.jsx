import { useEffect, useState } from "react";
import Table from "../Components/Table";
import { useExpenseContext } from "../Context/expense.context";
import Select from "react-select";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { category } from "../Utility/Constants";
import { useDispatch } from "react-redux";
import {
  displayExpense,
  clearExpense,
} from "../Features/ExpenseReducer/expenseSlice";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseTable = () => {
  // const {
  //   displayExpense,
  //   displayExpenseTable,
  //   setSelectedMonth,
  //   selectedMonth,
  //   category,
  //   setSelectedCategory,
  //   selectedCategory,
  //   totalAmount,
  //   setDisplayExpenseTable,
  // } = useExpenseContext();
  const dispatch = useDispatch();

  const [selectedMonth, setSelectedMonth] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const expense = useSelector((state) => state.expenseState.expense);
  console.log(expense, "table");
  const email = "shiv@gmail.com";

  const data = {
    labels: expense?.map((data) => data.category),
    datasets: [
      {
        label: "Expenses",
        data: expense?.map((data) => data.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  // const [selectedMonths, setSelectedMonths] = useState([]);

  const handleChange = (selectedOption) => {
    dispatch(clearExpense());
    setSelectedMonth(selectedOption);
  };

  let sno = 0;

  const handleClear = () => {
    setSelectedCategory("");
    setSelectedMonth("");
    dispatch(clearExpense());
  };

  useEffect(() => {
    dispatch(displayExpense({ selectedMonth, selectedCategory, email }));
  }, [selectedCategory, selectedMonth]);

  return (
    <div>
      <Select
        isMulti
        name="selectedMonths"
        options={months}
        className="basic-multi-select"
        classNamePrefix="select"
        value={selectedMonth}
        onChange={handleChange}
      />

      <select
        className="select select-bordered w-full max-w-xs"
        onChange={(e) => {
          dispatch(clearExpense());
          setSelectedCategory(e.target.value);
        }}
      >
        <option disabled selected>
          Select Category
        </option>
        {category?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={handleClear}>
        Clear
      </button>
      {expense?.length === 0 ? (
        <>
          <div>No data available</div>
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>

            {expense?.map((item) => {
              sno++;

              return (
                <Table
                  sno={sno}
                  key={item.id}
                  title={item.title}
                  amount={item.amount}
                  date={item.date.seconds * 1000}
                  cate={item.category}
                />
              );
            })}
          </table>
          <div className="text-xl font-semibold mt-6">
            Total Amount : {totalAmount}
          </div>
        </div>
      )}
      {/* <div className="h-96">
            <Pie data={data} />
          </div> */}
    </div>
  );
};

export default ExpenseTable;
