import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FeedPage from './pages/feed-page/FeedPage.page'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './assets/css/index.css'
import SignInPage from './pages/sign-in/SignInPage.page'
import VerifyOTPPage from './pages/verify-otp-page/VerifyOTPPage.page'
import PostPage from './pages/post-page/PostPage.page'

export const apolloClient = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_GATEWAY_HOST,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
    },
})

const router = createBrowserRouter([
    {
        path: '/',
        element: <FeedPage />,
    },
    {
        path: '/sign-in',
        element: <SignInPage />,
    },
    {
        path: '/verify-otp',
        element: <VerifyOTPPage />,
    },

    {
        path: '/:universityName',
        element: <FeedPage />,
    },
    {
        path: '/:universityName/:postID',
        element: <PostPage />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
    </ApolloProvider>
)
