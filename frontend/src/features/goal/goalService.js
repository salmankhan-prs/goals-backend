import axios from "axios";
import toast from "react-hot-toast";
const API_URL = "http://localhost:5000/api/goals";

const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  //   const res = await fetch(API_URL, {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });

  return response.data;
};

const createGoals = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, { text: data }, config);
  return response.data;
};
const updateGoals = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "/" + data.id,
    { text: data.text },
    config
  );

  return response.data;
};

const deleteGoals = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "/" + id, config);
  //   const res = await fetch(API_URL, {"/"
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  return id;
};

const goalService = {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
};

export default goalService;
