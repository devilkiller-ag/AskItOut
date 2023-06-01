import React from 'react';
import Quest from './../Quest';
import BottomMenu from './../BottomMenu';
import SearchBar from './../SearchBar';
import './../../styles/HomePage/HomePage.css';
import QuestionThread from '../QuestionPage/QuestionThread';
import getDate from '../../utils/getDate';

// Sample Search Data for Books
import BookData from './../../Assets/data/SampleData.json';
import questions from '../../Assets/data/questions.json';
import { fetchUser } from '../../utils';

export default function Home() {

  const user = fetchUser(1);

  return (
    <div className='w-full lg:max-w-[1200px] h-screen mx-auto flex relative'>
      <header className='hidden lg:block'>
        <div className='bg-white h-full lg:min-w-[300px] pb-3 flex flex-col justify-between items-center content-center'>
          <div className='flex w-full flex-col justify-center items-center'>
            <h1 className='text-3xl font-semibold text-center h-16 w-full py-3 bg-blue-300'>AskItOut</h1>
            <SearchBar placeholder="Type your question" searchdata={BookData} />
          </div>
          <div className='text-xs text-center text-[#6A737D]'>
            <div><a href="/" target='_blank'>T&C</a> &nbsp;•&nbsp; <a href="/" target='_blank'>Code of Conduct</a> &nbsp;•&nbsp; <a href="/" target='_blank'>Privacy</a></div>
            <div>&#169;&nbsp;{getDate(Date.now()).year} AskItOut</div>
          </div>
        </div>
      </header>
      <main className='flex justify-between items-center bg-[#f2f2f2] lg:w-[950px]'>
        <div className="feedArea flex flex-col max-h-[100vh] lg:w-[700px] sm:border-x-2">
          <div className="w-full h-16 px-6 py-4 bg-white font-bold text-2xl">
            Top Quests
          </div>
          <div className='questList flex flex-col items-center pt-4 gap-4 overflow-y-scroll'>
            {
              questions.map((question) => (
                <Quest question={question} />
              ))
            }
          </div>
        </div>

        <aside className='bg-white h-full lg:w-[360px]'>
          <div className="topbar bg-blue-300 w-full h-16 px-2 flex justify-between items-center">
            <div className="username text-sm text-center">
              {`${user.firstName} ${user.lastName}`}
            </div>
            <div className='options flex justify-center item-center gap-2'>
              <div className="toggletheme bg-white w-[40px] max-w-[40px] h-[40px] max-h-[40px] rounded-full flex justify-center items-center cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="notification bg-white w-[40px] max-w-[40px] h-[40px] max-h-[40px] rounded-full flex justify-center items-center cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="profile bg-white w-[40px] max-w-[40px] h-[40px] max-h-[40px] rounded-full flex justify-center items-center cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="#2A353D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="#2A353D" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {/* Aside: Thread or Saved Questions */}
            <QuestionThread question={questions[0]} />
          </div>
        </aside>
      </main>
      <div className="bottomMenu z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
        < BottomMenu currentPage='HomePage' />
      </div>
    </div>
  )
}
