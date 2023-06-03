import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function Homepage() {
  return (
    <div>
      <MainLayout>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </MainLayout>
    </div>
  );
}

export default Homepage;
