import React, { useState, useEffect } from 'react';
import './../../styles/HomePage/HomePage.css';
// Sample Search Data for Books
import BookData from './../../Assets/data/SampleData.json';
import Quest from '../Commons/Quest';
import { BottomMenu, SearchBar, TopMenu } from '../Commons';
import Categories from './Categories';
import QuestionThread from './../QuestionPage';
import { fetchQuestions, getDate } from '../../utils';

export default function Home() {

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

  // Pass the question category. Ex.: "java", "aiml", "python", ... ,"all" for random questions for all categories
  const questions = fetchQuestions("all");

  return (
    <div className='bg-[#F2F2F2] w-full h-full'>
      <div id="home_header" className={`${isMobile ? '' : 'fixed top-0 z-20'} w-full h-16 px-4`}>
        {
          isMobile ?
            <TopMenu currentPage='home' fromPage='home' />
            :
            <div className='flex justify-between items-center'>
              <div className='text-2xl font-semibold'>AskItOut</div>
              <TopMenu currentPage='home' fromPage='home' />
            </div>
        }
      </div>

      <div id="home_body" className={`${isMobile ? '' : 'pt-16'} flex justify-center items-start w-full h-full`}>
        {
          !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-full flex`}>
            <div className='h-full w-[30%]'>
              &nbsp;
            </div>
            <div className='h-full w-[70%] flex flex-col justify-between items-center'>
              {!isMobile && <SearchBar placeholder="Type your question" searchdata={BookData} />}

              <div className='text-xs text-center text-[#6A737D] p-2'>
                <div><a href="/" target='_blank'>T&C</a> &nbsp;•&nbsp; <a href="/" target='_blank'>Code of Conduct</a> &nbsp;•&nbsp; <a href="/" target='_blank'>Privacy</a></div>
                <div>&#169;&nbsp;{getDate(Date.now()).year} AskItOut</div>
              </div>
            </div>
          </aside>
        }

        <main className={`${isMobile ? 'h-full w-full' : 'h-[91vh] overflow-y-auto w-[50%] pb-[96px]'}`}>
          {isMobile && <SearchBar placeholder="Type your question" searchdata={BookData} />}

          <Categories />

          <div id='feedArea' className={`bg-[#F2F2F2] flex flex-col py-2`}>
            <div className="text-2xl font-medium pb-2 px-4 w-full">
              Top Quests
            </div>
            <div id='questList' className='flex flex-col items-center pt-4 gap-4  w-full'>
              {
                questions.map((question, key) => (
                  <Quest question={question} key={key} />
                ))
              }
            </div>
          </div>

          <div id='bottomMenu' className="z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
            < BottomMenu currentPage='HomePage' />
          </div>
        </main>
        
        {
          !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-[90vh] overflow-y-auto`}>
            {/* &nbsp; */}
            <QuestionThread question={questions[0]} />
          </aside>
        }
      </div>
    </div>
  )
}
