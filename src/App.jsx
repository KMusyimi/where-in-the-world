import './App.css'
import './Spinner.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Homepage, {homepageLoader} from "./views/Homepage.jsx";
import Details, {detailsLoader} from "./views/Details.jsx";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
    <Route index element={<Homepage/>} loader={homepageLoader}/>
    <Route path={'page'} element={<Details/>} loader={detailsLoader}/>
    {/*<Route path={'results'} element={<Details/>} errorElement={<Error/>}/>*/}
</Route>), {
    future: {
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_fetcherPersist: true,
        v7_partialHydration: true,
        v7_skipActionStatusRevalidation: true,
    }
})

function App() {
    return (<RouterProvider router={router} future={{v7_startTransition: true}}/>)
}

export default App
