/**
 * Reducer function for authentication state.
 *
 * @param {Object} state - Current state object. Default value is {data: null}.
 * @param {Object} action - Action object.
 * @returns {Object} - Updated state object.
 */
const authReducer = (state = { data: null }, action) => {
  switch (action.type) {
    /**
     * Action type: AUTH
     * Updates the local storage with the authenticated profile data and returns the updated state with the authenticated data.
     * @param {any} action.data - The new authenticated data.
     * @returns {object} - The new state with the updated authenticated data.
     */
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };

    /**
     * Action type: LOGOUT
     * Clears the local storage and returns the state with null data to indicate logout.
     * @returns {object} - The new state with null data.
     */
    case "LOGOUT":
      localStorage.clear();
      return { ...state, data: null };

    /**
     * Default action type
     * Returns the current state for any other action types.
     * @returns {object} - The current state.
     */
    default:
      return state;
  }
};

export default authReducer;
