import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Header";
import DashboardPage from "./components/dashboard/DashboardPage";
import ProductPage from "./components/products/ProductPage";
import NotFoundPage from "./components/NotFoundPage";
import Footer from "./components/Footer";
import ProtectedRoute from "../src/components/ProtectedRoute";
const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route exact path="/dashboard" element={<ProtectedRoute />}>
          <Route exact path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route exact path="/" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
