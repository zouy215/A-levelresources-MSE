import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const ALevelPortal = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Admin credentials
        const adminUsername = 'OliverChow';
        const adminPassword = 'your_admin_password'; // Replace with actual password

        // Check for authentication
        if (username === adminUsername && password === adminPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials!');
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div>
            <h1>A-Level Portal</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Username:
                        <input
type='text'
value={username}
onChange={(e) => setUsername(e.target.value)}
/>
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
type='password'
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
                    </label>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default ALevelPortal;
