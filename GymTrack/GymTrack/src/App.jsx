import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RoutinesProvider } from "./context/RoutinesContext";
import { WorkoutsProvider } from "./context/WorkoutsContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { GoalsProvider } from "./context/GoalsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Routines from "./pages/Routines";
import RoutineEditor from "./pages/RoutineEditor";
import WorkoutSession from "./pages/WorkoutSession";
import History from "./pages/History";
import Progress from "./pages/Progress";
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationsProvider>
          <GoalsProvider>
            <RoutinesProvider>
              <WorkoutsProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ejercicios" element={<Exercises />} />
                  <Route path="/rutinas" element={<ProtectedRoute><Routines /></ProtectedRoute>} />
                  <Route path="/rutinas/:id" element={<ProtectedRoute><RoutineEditor /></ProtectedRoute>} />
                  <Route path="/entrenamiento/:routineId" element={<ProtectedRoute><WorkoutSession /></ProtectedRoute>} />
                  <Route path="/historial" element={<ProtectedRoute><History /></ProtectedRoute>} />
                  <Route path="/progreso" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
                  <Route path="/objetivos" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
                  <Route path="/calendario" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
                  <Route path="/notificaciones" element={<Notifications />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Register />} />
                  <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                </Routes>
                <Footer />
              </WorkoutsProvider>
            </RoutinesProvider>
          </GoalsProvider>
        </NotificationsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
