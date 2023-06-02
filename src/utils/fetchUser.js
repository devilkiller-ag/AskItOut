const fetchUser = (userId) => {

    // Write algo for calculating userLevel according to questions asked and answers solved.
    const userLevel = "Master";

    // Write algo to calculate this from questions list
    const graphData = {
        "asked": [
            {
                "name": "Week 1",
                "previous": "3",
                "current": "1"
            }, {
                "name": "Week 2",
                "previous": "2",
                "current": "0"
            }, {
                "name": "Week 3",
                "previous": "3",
                "current": "2"
            }, {
                "name": "Week 4",
                "previous": "4",
                "current": "1"
            }
        ],

        "answered": [
            {
                "name": "Week 1",
                "previous": "1",
                "current": "1"
            }, {
                "name": "Week 2",
                "previous": "3",
                "current": "2"
            }, {
                "name": "Week 3",
                "previous": "2",
                "current": "0"
            }, {
                "name": "Week 4",
                "previous": "4",
                "current": "3"
            }
        ]
    }

    return {
        "firstName": "Rajendra",
        "lastName": "Verma",
        "avtarIndex": 2,
        "email": "rajendra.v@xyz.com",
        "password": "rajven",
        "about": "I am an Electronics Engineering Student and an web developer searching for solutions to web development bugs.",
        "tags": ["Rust", "JavScript", "Python", "React", "HTML/CSS", "C++"],
        "noOfQuestionsAsked": 20,
        "noOfAnswersGiven": 15,
        userLevel,
        graphData
    }
}

export default fetchUser;