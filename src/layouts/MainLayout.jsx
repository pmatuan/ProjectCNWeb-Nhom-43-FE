import propTypes from "prop-types";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

MainLayout.propTypes = {
  children: propTypes.any,
};

export default MainLayout;
