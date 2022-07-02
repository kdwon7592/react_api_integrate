import Users from './components/Users';
import { UserProvider } from './components/UsersContext';

function App() {
  return (
    <UserProvider>
      <Users />
    </UserProvider>
  );
}

export default App;
