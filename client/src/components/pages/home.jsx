import Grad from "../../assets/icons8-graduate-94.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="container">
      <section className="">
        <div className="container">
          <h1 className="display-4 fw-bold d-flex justify-content-center m-4">
            Track Your Courses Effortlessly{" "}
            <img style={{ width: 60 }} src={Grad} />
          </h1>
          <p className="lead mt-3 d-flex justify-content-center">
            Stay organized and achieve your learning goals with our Course
            Tracker App. Manage progress, deadlines, and milestones all in one
            place.
          </p>
          <a href="#features" className="btn btn-light btn-lg mt-4">
            Learn More
          </a>
          <Link to='/signup' className="btn btn-outline-light btn-lg mt-4">
            Get Started
          </Link>
        </div>
      </section>
      <section id="features" style={{ padding: "60px 20px" }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <i className="bi bi-calendar-check display-4 text-primary"></i>
              <h4 className="mt-3">Organized Schedule</h4>
              <p>Plan and manage your course schedule with ease </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-bar-chart-line display-4 text-success"></i>
              <h4 className="mt-3">Track Progress</h4>
              <p>
                Monitor your learning journey with real-time progress tracking
                and analytics.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-chat-dots display-4 text-info"></i>
              <h4 className="mt-3">Collaborate</h4>
              <p>
                Connect with peers, share notes, and collaborate on projects
                seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Ready to Boost Your Learning?</h2>
          <p className="mt-3">
            Sign up today and take the first step towards achieving your
            educational goals.
          </p>
          <Link to='/signup' className="btn btn-light btn-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
export default Home;
