import {BrowserRouter , Routes , Route} from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AppProvider from './ContextApi/AppContext';
import FindFriends from './Pages/FindFriends/FindFriends';
import Home from './Pages/Home/Home';
import Login from './Pages/login/Login';
import Profile from './Pages/Profile/Profile';
import Groups from './Components/Groups/Groups'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/friends' element={<FindFriends />} />
            <Route path = '/groups' element = {<Groups />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
