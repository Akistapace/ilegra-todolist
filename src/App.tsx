import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ToDOList from './pages/ToDoList/ToDoList';
import useAuthControl from './store/userAuthControl';
import Layout from './ui/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Register } from './pages/Register';

interface ChallengProp {
	children: ReactNode;
}
const Challenge = ({ children }: ChallengProp) => {
	const isAuthenticated = useAuthControl((state) => state.isAuthenticated);

	return isAuthenticated ? children : <Navigate to='/' />;
};
function App() {
	return (
		<Layout>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/to-do-list'
						element={
							<Challenge>
								<ToDOList />
							</Challenge>
						}
					/>
				</Routes>
			</Router>
		</Layout>
	);
}

export default App;

