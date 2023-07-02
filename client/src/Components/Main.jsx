import Home from './HomePage/Home';

/**
 * @component
 * Main component responsible for rendering the main content.
 * 
 * @returns {JSX.Element} JSX element representing the main content.
 */
const Main = () => {

  return ( 
    <div className='w-full h-screen flex justify-center items-center bg-[#F2F2F2]'>
      <Home />
    </div>
  )
}

export default Main;