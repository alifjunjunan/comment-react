import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import RegistPage from './pages/RegistPage';
import { useDispatch, useSelector } from 'react-redux'
import { keepLoginAction } from './redux/actions';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoadingPage from './pages/LoadingPage';
import AddDiaryPage from './pages/AddDiaryPage';
import DetailDairyPage from './pages/DetailDairyPage';

function App() {
  const [isloading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  const { role } = useSelector((state) => {
    return {
      role: state.userReducer.role
    }
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      let res = await dispatch(keepLoginAction())
      if (res.success) {
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (error) {

    }
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegistPage />} />
        {
          role === 'user' ?
            <>
              <Route path='/home' element={<HomePage isloading={isloading} />} />
              <Route path='/add/diary' element={<AddDiaryPage isloading={isloading}/>} />
              <Route path='/detail/diary/:id' element={<DetailDairyPage isloading={isloading}/>} />
            </>
            :
            <Route path='*' element={<LoadingPage />} />
        }
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App;
