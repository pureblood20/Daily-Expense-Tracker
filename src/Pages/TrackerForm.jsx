import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addExpense } from "../Features/ExpenseReducer/expenseSlice";
import { useState } from "react";
import { category } from "../Utility/Constants";

const TrackerForm = () => {
  // const { category, expenseDetails, setExpenseDetails, addExpense } =
  //   useExpenseContext();
  const [expenseDetails, setExpenseDetails] = useState({
    email: "shiv@gmail.com",

    amount: "",

    category: "",

    date: "",

    title: "",
  });

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (
      expenseDetails.email === "" ||
      expenseDetails.date === "" ||
      expenseDetails.amount === "" ||
      expenseDetails.category === ""
    ) {
      toast.error("Please provide all values.");
      return;
    }
    try {
      // addExpense();
      dispatch(addExpense({ expenseDetails }));
      toast.success("Success!!");

      setExpenseDetails({
        email: "shiv@gmail.com",

        amount: "",

        category: "",

        date: "",

        title: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Some error occured. Please try again");
    }
  };

  const handleChange = (event) => {
    setExpenseDetails((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <>
      <div>
        <h2 className="text-4xl mb-5">Expenses</h2>
        <form>
          <label className="input input-bordered flex items-center w-1/2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              required
              placeholder="Expense Title"
              value={expenseDetails.title}
              onChange={(e) =>
                setExpenseDetails((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
            />
          </label>
          <label className="input input-bordered flex items-center w-1/2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Expense Amount"
              value={expenseDetails.amount}
              onChange={(e) =>
                setExpenseDetails((prevState) => ({
                  ...prevState,
                  amount: e.target.value,
                }))
              }
              required
            />
          </label>
          <div className="relative w-1/2 mb-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              type="date"
              className="text-sm rounded-lg block w-full ps-10 p-2.5"
              placeholder="Select date"
              value={expenseDetails.date}
              onChange={(e) =>
                setExpenseDetails((prevState) => ({
                  ...prevState,
                  date: e.target.value,
                }))
              }
              required
            />
          </div>
          <select
            className="select select-bordered w-1/2 mb-4"
            onChange={handleChange}
            value={expenseDetails.category}
            required
          >
            <option disabled selected value="">
              Select category
            </option>
            {category.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="mb-4">
            <button
              type="submit"
              className="btn btn-active btn-neutral w-1/2"
              onClick={(e) => handleClick(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TrackerForm;
