import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionsReducer from "./questions";
import usersReducer from "./users";

/**
 * Combine and return multiple reducers into a single reducer function using Redux's `combineReducers` utility.
 */
export default combineReducers({
  authReducer, // Reducer for managing authentication state
  currentUserReducer, // Reducer for managing current user state
  questionsReducer, // Reducer for managing question data
  usersReducer, // Reducer for managing user data
});
