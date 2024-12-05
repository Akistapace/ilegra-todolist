import { ReactNode, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthControl from './store/userAuthControl';
import Layout from './ui/Layout/Layout';

const PageHome = lazy(() => import('./pages/Home'));
const PageLogin = lazy(() => import('./pages/Login'));
const PageRegister = lazy(() => import('./pages/Register'));
const PageTask = lazy(() => import('./pages/Task'));
const PageToDOList = lazy(() => import('./pages/TodoList'));
const PageNotFound = lazy(() => import('./pages/NotFound'));

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
				<Suspense
					fallback={<div className={`page page-loading`}>Carregando...</div>}
				>
					<Routes>
						<Route path='/' element={<PageHome />} />
						<Route path='/login' element={<PageLogin />} />
						<Route path='/register' element={<PageRegister />} />
						<Route
							path='/to-do-list'
							element={
								<PrivateRoute>
									<PageToDOList />
								</PrivateRoute>
							}
						/>

						<Route
							path='/task/:id'
							element={
								<PrivateRoute>
									<PageTask />
								</PrivateRoute>
							}
						/>
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</Suspense>
			</Layout>
		</Router>
	);
}

export default App;

