import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Layout from './layout/Layout';
import Home from './pages/Home';
import History from './pages/History';
import Overview from './pages/Overview';
import ScreenSpec from './pages/ScreenSpec';

export default function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:productId/history" element={<History />} />
          <Route path="/:productId/overview" element={<Overview />} />
          <Route path="/:productId/screen-spec" element={<ScreenSpec />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ProductProvider>
  );
}
