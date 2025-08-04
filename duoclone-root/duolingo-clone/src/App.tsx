import './App.css'
import { LearnHeader } from './Header/LearnHeader'



function App() {

  return (
    <>
      <div className='w-dvw h-dvh flex flex-col bg-duoBackground'>
        <LearnHeader/>

        <div className='px-4 w-full'>
          <button className='w-full h-20 active:translate-y-[5px] active:shadow-none shadow-duoShadow bg-duoGreen rounded-2xl'>
            <div className='flex rounded-2xl h-20  w-full'>
            <div className='w-5/6 h-full px-4 pb-3 flex flex-col'>
              <div className='mt-3 text-duoSubText'>
                <p>SECTION 3, UNIT 1</p>
              </div>
              <div className='text-white text-xl'>
                <p>Discuss a new job</p>
              </div>
            </div>
            <div className='h-full w-1/6 border-l flex justify-center items-center'>
              <img src='https://d35aaqx5ub95lt.cloudfront.net/images/path/5b531828e59ae83aadb3d88e6b3a98a8.svg'/>
            </div>
            </div>

          </button>
        </div>

        <div className='w-full flex mt-20 h-full justify-center'>
          <button className='h-14 flex items-center justify-center w-16 active:translate-y-[8px] active:shadow-none bg-duoGreen shadow-duoCircleShadow rounded-full'>
          <div className='flex items-center justify-center w-16 rounded-full'>
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg"/>
          </div>
          </button>

        </div>

      </div>
    </>
  )
}

export default App

//    --transform-buttonTransform: translateY(5px);
