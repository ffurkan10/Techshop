import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import "./styles/style.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import Detail from "./pages/detail/Detail";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import Layout from "./layout/Layout";
import Profile from "./pages/profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <ToastContainer position="bottom-left" />

      <Router>
        <div className="App">
          <header className="App__nav">
            <Navbar />
          </header>
          <section className="App__list">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/Cart" element={<Cart />} />

              <Route path="/itemdetail/:id" element={<Detail />} />

              <Route element={<Layout />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
              </Route>
            </Routes>
          </section>
          <footer className="App__footer">
            <Footer />
          </footer>
        </div>
      </Router>
    </>
  );
}

export default App;
