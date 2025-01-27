import './App.css'
import './Spinner.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Homepage, {homepageLoader} from "./views/Homepage.jsx";
import Details, {detailsLoader} from "./views/Details.jsx";
import Layout from "./components/Layout.jsx";
import Error from "./components/Error.jsx";
import Results, {resultsLoader} from "./views/Results.jsx";
import NotFound from "./views/404.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route index element={<Homepage/>} loader={homepageLoader} errorElement={<Error/>}/>
        <Route path={'page'} element={<Details/>} loader={detailsLoader} errorElement={<Error/>}/>
        <Route path={'results'} element={<Results/>} loader={resultsLoader} errorElement={<Error/>}/>
        <Route path={'*'} element={<NotFound/>}/>
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
