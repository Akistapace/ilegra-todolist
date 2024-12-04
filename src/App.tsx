import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthControl from './store/userAuthControl';
import Layout from './ui/Layout/Layout';
import { Pages } from './pages';

interface ChallengProp {
	children: ReactNode;
}
const PrivateRoute = ({ children }: ChallengProp) => {
	const isAuthenticated = useAuthControl((state) => state.isAuthenticated);

	if (!isAuthenticated) return <Navigate to='/login' />;

	return children;
};

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path='/' element={<Pages.home />} />
					<Route path='/login' element={<Pages.login />} />
					<Route path='/register' element={<Pages.register />} />
					<Route
						path='/to-do-list'
						element={
							<PrivateRoute>
								<Pages.toDoList />
							</PrivateRoute>
						}
					/>

					<Route
						path='/task/:id'
						element={
							<PrivateRoute>
								<Pages.task />
							</PrivateRoute>
						}
					/>
					<Route path='*' element={<Pages.notFound />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;

