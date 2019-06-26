import React, { Component } from 'react'
import { connect } from "react-redux";

class Statistics extends Component {
  constructor(props){
    super(props);

    if (props.projectId && !props.projects[props.projectId].statistics){

    }
  }

  render() {
    return (
      <div id="stat" className="stats">
        <h1>Статистика по всем проектам</h1>
        <div className="columns">
          <section className="column-50">
            <h2>За месяц:</h2>
            <p>Создано новых задач: 5</p>
            <p>Завершено задач: 8</p>
            <p>Среднесписочная численность: 2</p>
            <p>Затрачено человеко-часов: 65,92</p>
            <p>Среднее время на одну задачу (ч): 8.24</p>
          </section>
          <section className="column-50">
            <h2>За все время:</h2>
            <p>Создано задач: 14</p>
            <p>Завершено задач: 12</p>
            <p>Среднесписочная численность: 2</p>
            <p>Затрачено человеко-часов: 85,32</p>
            <p>Среднее время на одну задачу (ч): 7.11</p>
          </section>
        </div>
        {/* 
        <h1>Статистика по проекту: Brand-New-Project</h1>
        <div className="columns">
          <section className="column-50">
            <h2>За месяц:</h2>
            <p>Создано новых задач: 5</p>
            <p>Завершено задач: 8</p>
            <p>Среднесписочная численность: 2</p>
            <p>Затрачено человеко-часов: 65,92</p>
            <p>Среднее время на одну задачу (ч): 8.24</p>
          </section>
          <section className="column-50">
            <h2>За все время:</h2>
            <p>Создано задач: 14</p>
            <p>Завершено задач: 12</p>
            <p>Среднесписочная численность: 2</p>
            <p>Затрачено человеко-часов: 85,32</p>
            <p>Среднее время на одну задачу (ч): 7.11</p>
          </section>
        </div>
        */}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  projects: store.projects
});

export default connect(mapStateToProps)(Statistics)
