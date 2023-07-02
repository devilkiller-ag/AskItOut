import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import { NavLink, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { askQuestion } from '../../actions/question';
import TextEditor from "../Commons/TextEditor";
import { BottomMenu, TopMenu } from '../Commons';

/**
 * @component
 * Ask Question Component
 * Renders a form for asking question and handles form submission.
 * 
 * @returns {JSX.Element} - The JSX element for the Ask Question page.
 */
const AskQuestion = () => {
    /**
     * MOBILE OR DESKTOP?:
     * Determines whether the current view is mobile or desktop.
     */
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

    /**
     * USER INFO:
     * Stores user-related information.
     */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchedUser = useSelector((state) => (state.currentUserReducer));
    if (fetchedUser === null) {
        navigate('/login');
    }
    let user = null;
    useEffect(() => {
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    }, [dispatch])

    /**
     * FORM DATA:
     * Stores and manages the data entered in the form.
     */
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState(``);
    const [questionTags, setQuestionTags] = useState([]);

    /**
     * Handles the form submission.
     *
     * @param {Object} event - The form submission event.
     */
    const handleSubmit = async (event) => {
        // Prevent Default Behaviour of FORM SUBMISSION

        event.preventDefault();
        // Handle form submission

        if (questionTitle === '') {
            toast.error('Question title can not be empty!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (questionBody === '') {
            toast.error('Question body can not be empty!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (questionTags === '') {
            toast.error('Enter atleast one tag for your question!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            user = fetchedUser.result;
            dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: `${user.firstName} ${user.lastName}` }, navigate))
        }
    };

    return (
        <div className='bg-[#F2F2F2] w-full h-full'>
            {/* Toast container for displaying notifications */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* Header section */}
            <div id="home_header" className={`${isMobile ? '' : 'fixed top-0 z-20'} w-full h-16 px-4`}>
                {
                    isMobile ?
                        <TopMenu currentPage='ask' fromPage='home' />
                        :
                        <div className='flex justify-between items-center'>
                            <NavLink to={'/'}><div className='text-2xl font-semibold'>AskItOut</div></NavLink>
                            <TopMenu currentPage='ask' fromPage='home' />
                        </div>
                }
            </div>

            {/* Body section */}
            <div id="home_body" className={`${isMobile ? '' : 'pt-16'} flex justify-center items-start w-full h-full`}>
                {/* EMPTY SPACE LEFT SIDE */}
                {
                    !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-full flex`}>
                        &nbsp;
                    </aside>
                }

                {/* Form section */}
                <form onSubmit={handleSubmit} className={`${isMobile ? 'h-full w-full' : 'h-[91vh] overflow-y-hidden w-[50%] pb-[96px]'}`}>
                    {/* Question Title */}
                    <div id='questionTitleArea' className='w-full px-4'>
                        <label htmlFor="questionTitle"></label>
                        <input type="text" id='questionTitle' name='questionTitle' placeholder='Question title' className='w-full px-3 py-4 rounded-[10px] text-sm font-light h-[30px] focus:outline-nonez' onChange={(e) => { setQuestionTitle(e.target.value) }} />
                    </div>

                    {/* Text Editor */}
                    <div id='editorArea' className={`bg-[#F2F2F2] flex flex-col`}>
                        <label htmlFor='textEditor'></label>
                        <TextEditor id='textEditor' editorValue={questionBody} setEditorValue={setQuestionBody} editorPlaceholder="Write question body here..." />
                    </div>

                    {/* Question Tags */}
                    <div id='questionTagsArea' className='w-full px-4'>
                        <label htmlFor="questionTags"></label>
                        <input type="text" id='questionTags' name='questionTags' placeholder="Add upto 5 tags seperated by 'comma'." className='w-full px-3 py-4 rounded-[10px] text-sm font-light h-[30px] focus:outline-nonez' onChange={(e) => { setQuestionTags(e.target.value.split(",").map(tag => (tag.trim()))) }} />
                    </div>

                    {/* Bottom Menu */}
                    <div id='bottomMenu' className="z-50 flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
                        < BottomMenu currentPage='AskPage' />
                    </div>
                </form>

                {/* EMPTY SPACE RIGHT SIDE */}
                {
                    !isMobile && <aside className={`bg-[#F2F2F2] w-[25%] h-[90vh] overflow-y-auto`}>
                        &nbsp;
                    </aside>
                }
            </div>
        </div>
    )
}

export default AskQuestion;