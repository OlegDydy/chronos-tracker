import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render () {
    return (
      <nav className="nav-bar">
        <a href="https://www.kodep.ru" className="nav-bar__logo">
          <span className="nav-bar__icon"></span>
          <span>ODEP</span>
        </a>
        <Link to="/boards" className="nav-bar__tab selected">
          Проекты
        </Link>
        <Link to="/statistics" className="nav-bar__tab">
          Статистика
        </Link>
        <Link to="/vacations" className="nav-bar__tab hidden">
          Отпуска
        </Link>
      </nav>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user
});

export default connect(mapStateToProps)(NavBar)
