/**
 * Reducer function for managing state related to questions.
 *
 * @param {Object} state - Current state.
 * @param {Object} action - Action object.
 * @returns {Object} - Updated state.
 */
const questionsReducer = (state = { data: null }, action) => {
  switch (action.type) {
    /**
     * Handles the action type "POST_QUESTION".
     * Returns a copy of the current state.
     *
     * @returns {Object} - Copy of the current state.
     */
    case "POST_QUESTION":
      return { ...state };

    /**
     * Handles the action type "POST_ANSWER".
     * Returns a copy of the current state.
     *
     * @returns {Object} - Copy of the current state.
     */
    case "POST_ANSWER":
      return { ...state };

    /**
     * Handles the action type "FETCH_ALL_QUESTIONS".
     * Returns a copy of the current state with the `data` property updated with the payload from the action.
     *
     * @param {Object} action.payload - Payload from the action.
     * @returns {Object} - Copy of the current state with the `data` property updated.
     */
    case "FETCH_ALL_QUESTIONS":
      return { ...state, data: action.payload };

    /**
     * Default case.
     * Handles any other action types.
     * Returns the current state as it is.
     *
     * @returns {Object} - Current state.
     */
    default:
      return state;
  }
};

export default questionsReducer;
