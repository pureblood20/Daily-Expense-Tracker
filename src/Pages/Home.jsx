import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">CoinSavvy: Master Your Money Moves</h2>
          <p>Track, budget, control. It's that simple.</p>
          <div className="card-actions justify-end">
            <Link to="/trackerform">
              <button className="btn btn-primary">Track</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
