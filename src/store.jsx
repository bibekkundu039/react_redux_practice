import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASK = "task/fetch";

const initialState = {
  task: [],
};

// reducer function to add and delete task
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case DELETE_TASK:
      const updatedTask = state.task.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        task: updatedTask,
      };

    case FETCH_TASK:
      return {
        ...state,
        task: [...state.task, ...action.payload],
      };

    default:
      return state;
  }
};

//store create
export const store = createStore(
  taskReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//data
// const data = { id: 7, title: "Learn React" };
// const data2 = { id: 2, title: "Learn Redux" };
// const data3 = { id: 3, title: "Learn Redux" };

//action creator
export const addTask = (taskData) => {
  return {
    type: ADD_TASK,
    payload: taskData,
  };
};

// dispatch action to add task
// store.dispatch(addTask(data));
// store.dispatch(addTask(data2));

export const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    payload: taskId,
  };
};

// store.dispatch(deleteTask(1));

//dispatch action to delete task
// store.dispatch({
//   type: DELETE_TASK,
//   payload: 1,
// });

// console.log(store.getState());

export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      );
      const data = await res.json();

      dispatch({
        type: FETCH_TASK,
        payload: data.map((task) => ({ id: task.id, title: task.title })),
      });
    } catch (error) {
      console.log(error);
    }
  };
};
