const React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <title>{this.props.title}</title>
          <link rel="shortcut icon" type="image/ico" href="images/favicon.ico"/>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"/>
          {this.props.css ? <link rel="stylesheet" type="text/css" href={"/css/" + this.props.css + ".css"}/> : null}
        </head>

        <body>
          {/* Navbar */}
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <i className="fas fa-warehouse navbar-brand" height="30"></i>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav mr-auto">
                <a className="nav-item nav-link active" href="/">Home</a>
                <a className="nav-item nav-link" href="/locations">Locations</a>
                <a className="nav-item nav-link" href="/things">Things</a>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Menu</a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="https://www.mapveto.com">Location 1</a>
                    <a className="dropdown-item" href="https://www.gymnasietips.com">Location 2</a>
                  </div>
                </li>
              </div>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
            <a className="btn btn-outline-success my-2 my-sm-0" href="/login">Sign in</a>
          </nav>

          {/* Page content */}
          {this.props.children}

          {/* Footer */}
          <div className="container-fluid bg-white pb-md-5 fixed-bottom">
            <hr/>
            <footer className="footer">
              <div className="container">
                © 2019 by Daniel Adu-Gyan
                <div className="float-right">
                  <a className="px-md-1" href="https://github.com/dannyadu" target="_blank"><i className="fab fa-github"></i></a>
                  <a className="px-md-1" href="https://www.twitch.tv/voltiq_" target="_blank"><i className="fab fa-twitch"></i></a>
                  <a className="px-md-1" href="https://steamcommunity.com/id/Voltiq_/" target="_blank"><i className="fab fa-steam"></i></a>
                  <a className="px-md-1" href="https://www.youtube.com/channel/UCeOwIc5m9P1u7YKHRrTip4g" target="_blank"><i className="fab fa-youtube"></i></a>
                  <a className="px-md-1" href="https://www.instagram.com/daniel.adugyan/" target="_blank"><i className="fab fa-instagram"></i></a>
                  <a className="px-md-1" href="https://twitter.com/Voltiq_" target="_blank"><i className="fab fa-twitter-square"></i></a>
                  <a className="px-md-1" href="https://www.facebook.com/daniel.adugyan" target="_blank"><i className="fab fa-facebook-square"></i></a>
                </div>
              </div>
            </footer>
          </div>

          {this.props.js ? <script type="text/javascript" src={"/js/" + this.props.js + ".js"}></script> : null}
          {/* Bootstrap */}
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.7/dist/css/bootstrap-select.min.css"/>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.7/dist/js/bootstrap-select.min.js"></script>

        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
