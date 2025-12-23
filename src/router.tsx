import { Navigate, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ReviewPage } from './pages/ReviewPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/roadmap',
    element: <RoadmapPage />,
  },
  {
    path: '/review',
    element: <ReviewPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
