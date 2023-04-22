// import Welcome1 from './Welcome1';
import Quest from './QuestionPage/QuestionDetail';
import BottomMenu from './BottomMenu';

const Main = () => {
  return ( 
    <div className='w-full h-screen flex justify-center items-center bg-[#f2f2f2] relative'>
      {/* <Welcome1 /> */}
      <Quest />
      <div className="bottomMenu flex items-center justify-center absolute bottom-0 left-0 right-0 m-auto">
        < BottomMenu currentPage='QuestionPage' />
      </div>
    </div>
  )
}

export default Main