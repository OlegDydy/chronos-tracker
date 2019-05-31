import React from "react"
import PropTypes from "prop-types"
class NavBar extends React.Component {
  render () {
    return (
      <nav className="nav-bar">
        <a href="https://www.kodep.ru" className="nav-bar__logo">
          <span className="nav-bar__icon"></span>
          <span>ODEP</span>
        </a>
        <a href="/boards" className="nav-bar__tab selected">
          Проекты
        </a>
        <a href="/statistics" className="nav-bar__tab">
          Статистика
        </a>
        <a href="/vacations" className="nav-bar__tab hidden">
          Календарь отпусков
        </a>
      </nav>
    );
  }
}

export default NavBar