import React, { createContext } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Search from './components/Search';
import UserProfile from './components/UserProfile';
import GymProfile from './components/GymProfile';
import Trainer from './components/TrainerProfile';
import GymHome from './components/GymHome';
import SearchTerainer from './components/SearchTrainer';
import TrainerList from './components/TrainerList';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/login';
import PrivateRoutes from './components/PrivateRoutes';
import UserHome from './components/UserHome';
import AboutPage from './components/AboutPage';
import GymSchedule from './components/GymSchedule';
import UserSchedule from './components/UserSchedule';
import Success from './components/Success';
import SlotBookings from './components/SlotBookings';
export const appData = createContext();
const data = createContext();

const App = () => (
  <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
    <AuthProvider>
    <Navbar/>
    </AuthProvider>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<UserHome />} />
          <Route path="/gym" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/gymprofile" element={<GymProfile />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/searchtrainer" element={<SearchTerainer />} />
          <Route path="/gymhome" element={<GymHome />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/trainerlist/:gym" element={<TrainerList />} />
          <Route path="/schedule/:id" element={<UserSchedule />} />
          <Route path="/gymschedule" element={<GymSchedule />} />
          <Route path="/slotbookings/:id" element={<SlotBookings />} />
          <Route path="/success/:id" element={<Success />} />
        </Route>
      </Routes>
      </AuthProvider>
  </Box>
);

export default App;
