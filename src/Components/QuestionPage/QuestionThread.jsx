import React from 'react';
import QuestionHead from './QuestionHead';
import QuestionDetail from './QuestionDetail';
import Answer from './Answer';
import DefaultAvatar from '../../Assets/images/DrawKitAvtars/DefaultAvatar.png';
import { fetchUser, getDate } from './../../utils';

const QuestionThread = ({ question }) => {

    const asker = fetchUser(question.userId);
    const askedOnDate = getDate(question.askedOn);
    const isMobile = false;

    return (
        <div className='threadContainer flex justify-center items-center'>
            <div className='lg:h-[91vh] w-[360px] max-w-[360px] lg:max-h-[91vh] px-3 bg-[#f2f2f2] py-3 overflow-y-scroll'>
                <div className='threadHeader w-[310px] flex justify-center items-center gap-4'>
                    <div className="askerDetails flex items-center justify-center gap-2">
                        <div className="askerAvatar w-12 h-12 md:w-14 md:h-14">
                            <img src={DefaultAvatar} alt="User Avatar" />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <div className="askerName text-base font-bold black">{`${ asker.firstName } ${ asker.lastName }`}</div>
                            <div className="questCategory text-xs text-[#A8A8A8]">{ question.questionTags[0] }</div>
                        </div>
                    </div>
                    <div className="questDate text-xs text-[#A8A8A8]">{ `${ isMobile ? askedOnDate.month.substring(0, 3) : askedOnDate.month } ${ askedOnDate.day }, ${ askedOnDate.year }` }</div>
                </div>
                <div className="question flex flex-col items-center pt-4 gap-4">
                    <QuestionHead questionTitle={ question.questionTitle } flashCount={ question.upVote } />
                    <QuestionDetail questionBody={ question.questionBody } />
                </div>
                <div className="answers">
                    <div className="answersHeader flex items-center justify-between px-2 h-16">
                        <div className="answersTitle font-bold text-2xl">Answers</div>
                        <div className="seeAllAnswers text-xs text-[#A8A8A8] cursor-pointer">see all</div>
                    </div>
                    <div className="w-full h-full answersList flex flex-col items-center pt-4 gap-4 overflow-y-auto">
                        {
                            question.answers.map((answer) => (
                                <Answer answer={answer} key={answer._id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionThread
