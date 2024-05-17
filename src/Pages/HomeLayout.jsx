import { Outlet, useNavigation } from "react-router-dom";
import Navvbar from "../Components/Navvbar";
const HomeLayout = () => {
  const navigate = useNavigation();
  return (
    <div>
      <section className="flex flex-row">
        <div className="basis-1/4 rounded-md border-4 p-4 border-white mt-20 mx-7">
          <Navvbar />
        </div>
        <div className="basis-3/4 mt-20 mx-7 p-4 rounded-md border-4 border-white">
          {navigate.state === "loading" ? (
            <span className="loading loading-ring loading-lg" />
          ) : (
            <Outlet />
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeLayout;
