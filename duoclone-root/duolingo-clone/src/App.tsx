import './App.css'
import { LearnHeader } from './Header/LearnHeader'



function App() {

  return (
    <>
      <div className='w-dvw h-dvh flex flex-col bg-duoBackground'>
        <LearnHeader/>

        <div className='px-4 w-full'>
          <div className='w-full h-20 flex bg-duoGreen rounded-2xl'>
            <div className='w-5/6 h-full px-4 pb-3 flex flex-col'>
              <div className='mt-3'>
                <p>SECTION 3, UNIT 1</p>
              </div>
              <div>
                <p>Discuss a new job</p>
              </div>
            </div>
            <div className='h-full w-1/6 border-l flex justify-center items-center'>
              <img src='https://d35aaqx5ub95lt.cloudfront.net/images/path/5b531828e59ae83aadb3d88e6b3a98a8.svg'/>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
