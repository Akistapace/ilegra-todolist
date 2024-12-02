import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthControl from './store/userAuthControl';
import Layout from './ui/Layout/Layout';
import { Pages } from './pages';
interface ChallengProp {
	children: ReactNode;
}
const ChallengeAuth = ({ children }: ChallengProp) => {
	const isAuthenticated = useAuthControl((state) => state.isAuthenticated);

	return isAuthenticated ? children : <Navigate to='/' />;
};
function App() {
	return (
		<Layout>
			<Router>
				<Routes>
					<Route path='/' element={<Pages.home />} />
					<Route path='/login' element={<Pages.login />} />
					<Route path='/register' element={<Pages.register />} />
					<Route
						path='/to-do-list'
						element={
							<ChallengeAuth>
								<Pages.toDoList />
							</ChallengeAuth>
						}
					/>
					<Route path='/task/:id' element={<Pages.task />} />
					<Route path='*' element={<Pages.notFound />} />
				</Routes>
			</Router>
		</Layout>
	);
}

export default App;

