import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom';

import MainNavbar from "./components/navbar.component"
import ProductList from "./components/product-list.component"
import EditProduct from "./components/edit-product.component"
import AddProduct from "./components/create-product.component"
import CreateCategory from "./components/create-category.component"
import EditCategory from './components/edit.category.component';
import EditSubCategory from './components/edit.subCategory.component';

function App() {
  return (
    <>
      <MainNavbar />
      <br />
      <div className="Container">

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/create" element={<AddProduct />} />
          <Route path="/user" element={<CreateCategory />} />
          <Route path="/editcat/:id" element={<EditCategory />} />
          <Route path="/editsubcat/:id" element={<EditSubCategory />} />
          <Route path="/createcat" element={<CreateCategory />} />
        </Routes>
      </div>
    </>

  );
}

export default App;
