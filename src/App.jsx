import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/catalog"
          element={
            <Layout>
              <CatalogPage />
            </Layout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetailPage />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <CheckoutPage />
            </Layout>
          }
        />
        <Route
          path="/order-success"
          element={
            <Layout>
              <OrderSuccessPage />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <div className="pt-28 min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h1 className="font-serif text-4xl font-semibold mb-3">404</h1>
                <p className="text-gray-500 mb-6">This page doesn't exist.</p>
                <a href="/" className="btn-primary inline-flex">Go Home</a>
              </div>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
