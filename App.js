import React, {useState} from 'react';
import Login from './components/LoginForm';
import Home from './components/Home';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    if (isLoggedIn) {
        return <Home
            onLogoutPress={() => setIsLoggedIn(false)}
        />;
    } else {
        return <Login
            onLoginPress={() => setIsLoggedIn(true)}
        />;
    }
};
export default App;