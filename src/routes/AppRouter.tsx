import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';
import KanbanBoard from '../pages/KanbanBoard';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<KanbanBoard />} />
        </Route>
    )
);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
