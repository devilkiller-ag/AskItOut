/**
 * Returns the user level based on the number of questions asked and answers given.
 * @param {number} noOfQuestionsAsked - The number of questions asked by the user.
 * @param {number} noOfAnswersGiven - The number of answers given by the user.
 * @returns {string} The user level ('Beginner', 'Intermediate', 'Master').
 */
const getUserLevel = (noOfQuestionsAsked, noOfAnswersGiven) => {
  let userLevel = "Beginner";
  if (noOfQuestionsAsked > 10 && noOfAnswersGiven > 8) {
    userLevel = "Master";
  } else if (noOfQuestionsAsked > 6 && noOfAnswersGiven > 4) {
    userLevel = "Intermediate";
  } else {
    userLevel = "Beginner";
  }
  return userLevel;
};

export default getUserLevel;
