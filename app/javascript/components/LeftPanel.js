import React from "react"
import { connect } from "react-redux";
import iterate from "../utils/iterate";

function icon(){
  return (
    <svg
      className="avatar"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      width="50" height="50">
      <g clipPath="ellipse(25px 25px at 35px 25px)">
        <path fill="#fff" d="M0 0h50v50H0z"/>
        <path 
          fill="#00afcaff"
          d="M60 75a35 40 0 0 1-35 40 35 40 0 0 1-35-40 35 40 0 0 1 35-40 35 40 0 0 1 35 40zM35 20a10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10 10 10 0 0 1 10 10z"/>
      </g>
    </svg>
  )
}

class LeftPanel extends React.Component {
  renderList(list){
    const { setProject } = this.props;
    return iterate(list, (project, id) => {
      const className = 'project-list__item' + 
        (this.props.selectedIndex === id ? ' selected' : '')
      return (
        <div
          key={id}
          className={className}
          onClick={()=>{setProject(id)}}
        >
          { project.name }
        </div>)
    })
  }

  render () {
    const user = this.props.user;
    return (
      <div className="left-panel">
        <p className="login">{icon()} {user.name}</p>
        <div className="button-set">
          <button>Профиль</button>
          <button>Выйти</button>
          <button className="btn_full-length">+ Новый Проект</button>
        </div>
        <div className="space-top">Проект:</div>
        <div className="project-list">
          { this.renderList(this.props.projects) }
        </div>
        <div className="left-panel__links">
          <a href="/contacts">Связь&nbsp;с&nbsp;администрацией</a>{" | "}
          <a href="/about">Об&nbsp;организации</a>{" | "}
          <a href="/help">Помощь</a>{" | "}
          <a href="/privacy">Конфиденциальность</a>{" | "}
          <a href="/rules">Правила</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  projects: store.projects
})

export default connect(mapStateToProps)(LeftPanel)
