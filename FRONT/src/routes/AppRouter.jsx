import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import UserHome from '../layout/UserHome'
import NewTodoForm from '../layout/NewTodoForm'
import ProductDetail from '../layout/ProductDetail'
import MyProduct from '../layout/MyProduct'
import MyProductDetail from '../layout/MyProductDetail'
import EditProductForm from '../layout/EditProductForm'
import EditShippingForm from '../layout/EditShippingForm'
import Cart from '../layout/Cart'
import Profile from '../layout/Profile'
import Shipping from '../layout/Shipping'
import Point from '../layout/Point'
import Order from '../layout/Order'
import NewProductForm from '../layout/NewProductForm'
import NewCategoryForm from '../layout/NewCategoryForm'
import NewPublishingForm from '../layout/NewPublishingForm'
import NewAuthorForm from '../layout/NewAuthorForm'
import NewSeriesForm from '../layout/NewSeriesForm'
import NewShippingForm from '../layout/NewShippingForm'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm />}
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <UserHome /> },
      { path: '/edit/:productId', element: <EditProductForm />},
      { path: '/shipping/edit/:shippingId', element: <EditShippingForm />},
      { path: '/admin', element: <MyProduct />},
      { path: '/product/:productId', element: <ProductDetail />},
      { path: '/admin/product/:productId', element: <MyProductDetail />},
      { path: '/product/new', element: <NewProductForm />},
      { path: '/category/new', element: <NewCategoryForm />},
      { path: '/publishing/new', element: <NewPublishingForm />},
      { path: '/author/new', element: <NewAuthorForm />},
      { path: '/series/new', element: <NewSeriesForm />},
      { path: '/shipping/new', element: <NewShippingForm />},
      { path: '/cart', element: <Cart/>},
      { path: '/profile', element: <Profile/>},
      { path: '/shipping', element: <Shipping/>},
      { path: '/point', element: <Point/>},
      { path: '/order', element: <Order/>},
    ]
  }
])

export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}
