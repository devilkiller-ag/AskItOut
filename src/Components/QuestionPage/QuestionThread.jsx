import React, { useState, useEffect } from 'react';
import { TopMenu, BottomMenu } from '../Commons';
import AvatarArray from './../../Assets/images/DrawKitAvtars';
import QuestionHead from './QuestionHead';
import QuestionDetail from './QuestionDetail';
import Answer from './Answer';
import { fetchUser, getDate } from './../../utils';

const QuestionThread = ({ question }) => {

    // MOBILE OR DESKTOP?
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth } = window;
            setIsMobile(innerWidth <= 768);
        };

        // Add event listener to track window resize
        window.addEventListener('resize', handleResize);

        // Call handleResize initially
        handleResize();

        // Clean up the event listener when the component is unmounted
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    // FETCH DATA
    const asker = fetchUser(question.userId);
    const askedOnDate = getDate(question.askedOn);

    // HANDLE SEE ALL ANSWERS
    const [showAllAnswers, setShowAllAnswers] = useState(false);
    const topAnswer = question.answers[0];
    const handleSeeAllAnswers = () => {
        setShowAllAnswers(!showAllAnswers);
    }

    return (
        <div className='bg-[#F2F2F2] w-full h-full'>
            {
                isMobile && <div id="thread_header" className={`${isMobile ? '' : 'fixed top-0 z-20'} w-full h-16 px-4`}>
                    {
                        isMobile ?
                            <TopMenu currentPage='thread' fromPage='home' />
                            :
                            <div className='flex justify-between items-center'>
                                <div className='text-2xl font-semibold'>AskItOut</div>
                                <TopMenu currentPage='thread' fromPage='home' />
                            </div>
                    }
                </div>
            }

            <div className={`${isMobile ? '' : ''}`}>
                <div id='asker_header' className={`${isMobile ? 'w-full' : 'w-[310px]'} flex justify-between items-center px-4 py-4`}>
                    <div id='askerDetails' className="flex items-center justify-center gap-2">
                        <div className="askerAvatar w-12 h-12 md:w-14 md:h-14">
                            <img src={AvatarArray[asker.avtarIndex]} alt="Asker Avatar" />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <div className="askerName text-base font-bold black">{`${asker.firstName} ${asker.lastName}`}</div>
                            <div className="questCategory text-xs text-[#A8A8A8]">{question.questionTags[0]}</div>
                        </div>
                    </div>
                    <div className="questDate text-xs text-[#A8A8A8]">{`${isMobile ? askedOnDate.month.substring(0, 3) : askedOnDate.month} ${askedOnDate.day}, ${askedOnDate.year}`}</div>
                </div>

                <div id='question' className="flex flex-col items-center pt-4 px-4 gap-4">
                    <QuestionHead questionTitle={question.questionTitle} flashCount={question.upVote} />
                    <QuestionDetail questionBody={question.questionBody} />
                </div>

                <div id='bottomMenu' className="z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
                    < BottomMenu currentPage='HomePage' />
                </div>

                <div id="answers" className='w-full px-4 bg-[#F2F2F2]'>
                    <div id='answersHeader' className="flex items-center justify-between px-2 h-16">
                        <div id='answersTitle' className="font-bold text-2xl">Answers</div>
                        <div id='seeAllAnswers' className="text-xs text-[#A8A8A8] cursor-pointer" onClick={handleSeeAllAnswers}>{showAllAnswers ? 'show verified' : 'see all'}</div>
                    </div>
                    <div className={`w-full h-full answersList flex flex-col items-center pt-4 gap-4 overflow-y-auto ${isMobile ? 'pb-[80px]' : 'pb-[110px]'}`}>
                        {
                            showAllAnswers ?
                                question.answers.map((answer, key) => (
                                    <Answer answer={answer} key={key} />
                                ))
                                :
                                <Answer answer={topAnswer} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionThread