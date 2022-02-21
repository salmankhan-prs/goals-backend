import { getGoals, reset } from "../features/goal/goalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import GoalItem from "../components/GoalItem";
import GoalForm from "../components/GoalForm";
import toast from "react-hot-toast";
/* A function that returns a React component. */
const Dashboard = () => {
  const dispatch = useDispatch();
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const { user } = useSelector((state) => state.auth);
  const demo = useSelector((state) => state);

  useEffect(() => {
    dispatch(getGoals());
  }, []);
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <div className="goals">
        {goals && goals.length > 0 ? (
          goals.map((goal) => <GoalItem goal={goal} />)
        ) : (
          <p className="heading">No Goals yet !!!</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
