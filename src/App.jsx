import './index.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

class App extends React.Component {
  componentDidMount(){
    if(window.location.href === window.location.origin + '/'){
      window.location.replace("/all");
    }
  }

  render() {
    return (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/:categoryName' element={<CategoryPage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/cart' element={<CartPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
    );
  }
}

export default App;