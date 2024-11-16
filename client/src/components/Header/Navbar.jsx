


export default function Nav({ links }) {
  return (
    <header>
    <nav className="navbar navbar-expand-lg p-1 mb-5 shadow-lg bg-primary" style={{padding: '1rem'}}>
      <div className="container-fluid">
      <button className="navbar-toggler basic-navbar-nav" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {links.map((link) => link)}
          </ul>
        </div>
      </div>
    </nav>
    </header>
  );
}
