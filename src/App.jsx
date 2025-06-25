import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CalendarProvider } from "./context/CalendarContext";
import Dashboard from "./components/dashboard/summary";
import LoginForm from "./components/auth/login";
import SignUpForm from "./components/auth/signup";
import LoadingSpinner from "./components/ui/spinner";
import "./index.css";

const AuthWrapper = () => {
  const { user, loading } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {showSignUp ? (
          <SignUpForm onToggleForm={() => setShowSignUp(false)} />
        ) : (
          <LoginForm onToggleForm={() => setShowSignUp(true)} />
        )}
      </div>
    );
  }

  return (
    <CalendarProvider>
      <Dashboard />
    </CalendarProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}

export default App;
