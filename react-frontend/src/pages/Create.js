import React from "react";

const Create = (props) => {
  const addHandler = () => {
    console.log(props);
  };
  return (
    <div className="create form">
      <form>
        <select name="" id="">
          <option value="">Select Your Options</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
        <input type="text" placeholder="Your Title..." />
        <input type="number" placeholder="Amount" />
        <input type="date" placeholder="Date" />
        <textarea
          name=""
          id=""
          cols="35"
          rows="7"
          placeholder="Write details here...."></textarea>
        <button className="btn" onClick={addHandler}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Create;
