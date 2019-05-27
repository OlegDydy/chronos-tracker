import React from "react"
import PropTypes from "prop-types"

class Users extends React.Component {
  renderList(list){
    return list.map( (user, id) => {
      return (
        <li key={user.id}>ID: {user.id} | Login: "{user.login}" | Email: "{user.email}"</li>
      );
    })
  }

  render () {
    return (
      <ul>
        <li>Users:</li>
        {this.renderList(this.props.data)}
      </ul>
    );
  }
}

Users.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.id,
      login: PropTypes.string,
      email: PropTypes.string
    })
  )
};
export default Users
