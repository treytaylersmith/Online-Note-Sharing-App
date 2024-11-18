
const Footer = () => {
    return (
      <footer className="bg-dark text-white mt-5 py-3">
        <div className="container text-center">
          <p className="mb-1">&copy; 2024 Course Tracker App. All Rights Reserved.</p>
          <p className="mb-2">
            Designed by <span className="text-danger"></span> Course Tracker Team
          </p>
          <ul className="list-unstyled d-flex justify-content-center mb-0">
            <li className="ms-3 ">
              <a className="text-white hover-underline text-decoration-none link-warning" href="https://github.com/treytaylersmith/Online-Note-Sharing-App">
                Contact Us Through GitHub
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  };
  
  export default Footer;
 