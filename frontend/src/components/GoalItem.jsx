import { useState } from "react";
import toast from "react-hot-toast";
import { FiDelete, FiEdit2, FiSave } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteGoals, updateGoals } from "../features/goal/goalSlice";

const GoalItem = ({ goal }) => {
  const [change, setChange] = useState(false);
  const [text, setText] = useState("");
  const { goals, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.goals
  );
  const dispatch = useDispatch();
  const updateGoal = (goal) => {
    setChange(!change);
    setText(goal.text);
  };

  const saveGoal = (id) => {
    dispatch(updateGoals({ text, id }));
    setChange(!change);
  };

  const deleteGoal = (id) => {
    dispatch(deleteGoals(id));
  };

  return (
    <div className="goal">
      <div className="goal-flex">
        {new Date(goal.createdAt).toLocaleString("en-US")}

        <div className="goal-flex-inner">
          {!change && (
            <button className="btn btn-icon" onClick={() => updateGoal(goal)}>
              {"Edit "}
              <FiEdit2 />
            </button>
          )}
          {change && (
            <button className="btn btn-icon" onClick={() => saveGoal(goal._id)}>
              Save
              <FiSave />
            </button>
          )}
          {!change && (
            <button
              className="btn btn-icon"
              onClick={() => deleteGoal(goal._id)}
            >
              Delete
              <FiDelete />
            </button>
          )}
        </div>
      </div>

      <input
        type="text"
        disabled={!change}
        className={!change ? "editText" : "editTextActive"}
        value={!change ? goal.text : text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
export default GoalItem;
