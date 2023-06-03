import propTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: propTypes.any,
};

export default MainLayout;
