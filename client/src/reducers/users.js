/**
 * usersReducer function that handles state changes for users.
 *
 * @param {Array} states - The current state of users.
 * @param {Object} action - The action object that describes the type of action and payload.
 * @returns {Array} The updated state of users.
 */
const usersReducer = (states = [], action) => {
  switch (action.type) {
    /**
     * Action type: FETCH_USERS
     * This case handles the action to fetch users from an server and update the state.
     *
     * @param {Object} action.payload - The payload containing the fetched users data.
     * @returns {Array} - The new state containing the fetched users data.
     */
    case "FETCH_USERS":
      return action.payload;

    /**
     * Action type: UPDATE_CURRENT_USER
     * This case handles the action to update the details of the current user in the state.
     *
     * @param {Object} action.payload - The payload containing the updated user data.
     * @param {string} action.payload._id - The unique identifier of the user to be updated.
     * @returns {Array} - The new state with the current user's details updated.
     */
    case "UPDATE_CURRENT_USER":
      return states.map((state) =>
        state._id === action.payload._id ? action.payload : state
      );

    /**
     * Default case:
     * This case handles any other actions not explicitly handled by the reducer.
     *
     * @returns {Array} - The current state without any changes.
     */
    default:
      return states;
  }
};

export default usersReducer;
