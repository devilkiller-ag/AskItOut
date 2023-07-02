/**
 * Reducer function that handles the current user state.
 * @param {any} state - The current state (default value is null).
 * @param {Object} action - The action object containing a type and payload.
 * @returns {any} - The new state after handling the action.
 */
const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    /**
     * Action type: FETCH_CURRENT_USER
     * Updates the current user state with the provided payload.
     * @param {any} action.payload - The new current user value.
     * @returns {any} - The new state with the updated current user.
     */
    case "FETCH_CURRENT_USER":
      return action.payload;

    /**
     * Default case:
     * Returns the current state as it is.
     * @returns {any} - The current state.
     */
    default:
      return state;
  }
};

export default currentUserReducer;
