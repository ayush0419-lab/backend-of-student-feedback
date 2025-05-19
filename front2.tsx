import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { FeedbackProvider } from './context/FeedbackContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StudentView from './views/StudentView';
import AdminView from './views/AdminView';
import LoginForm from './components/auth/LoginForm';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);

  const handleLogin = (role: 'student' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <ThemeProvider>
      <UserProvider>
        <FeedbackProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
            <Header 
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              onLogout={handleLogout}
            />
            
            <main className="flex-grow">
              {!isAuthenticated ? (
                <LoginForm onLogin={handleLogin} />
              ) : userRole === 'admin' ? (
                <AdminView />
              ) : (
                <StudentView />
              )}
            </main>
            
            <Footer />
          </div>
        </FeedbackProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;