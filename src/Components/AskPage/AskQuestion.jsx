import React, { useState, useEffect } from 'react';
import TextEditor from "./TextEditor";
import { BottomMenu, TopMenu } from '../Commons';

const AskQuestion = () => {
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

    return (
        <div className='bg-[#F2F2F2] w-full h-full'>
            <div id="home_header" className={`${isMobile ? '' : 'fixed top-0 z-20'} w-full h-16 px-4`}>
                {
                    isMobile ?
                        <TopMenu currentPage='ask' fromPage='home' />
                        :
                        <div className='flex justify-between items-center'>
                            <div className='text-2xl font-semibold'>AskItOut</div>
                            <TopMenu currentPage='ask' fromPage='home' />
                        </div>
                }
            </div>

            <div id="home_body" className={`${isMobile ? '' : 'pt-16'} flex justify-center items-start w-full h-full`}>
                {
                    !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-full flex`}>
                        &nbsp;
                    </aside>
                }

                <main className={`${isMobile ? 'h-full w-full' : 'h-[91vh] overflow-y-hidden w-[50%] pb-[96px]'}`}>
                    <div id='editorArea' className={`bg-[#F2F2F2] flex flex-col py-2`}>
                        <TextEditor />
                    </div>

                    <div id='bottomMenu' className="z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
                        < BottomMenu currentPage='AskPage' />
                    </div>
                </main>

                {
                    !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-[90vh] overflow-y-auto`}>
                        &nbsp;
                    </aside>
                }
            </div>
        </div>
    )
}

export default AskQuestion