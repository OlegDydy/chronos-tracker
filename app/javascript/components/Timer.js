import React, { Component } from 'react';
import { connect } from 'react-redux';

class Timer extends Component {
  state = {
    timer: null,
    update: 0
  };
  
  componentDidMount(){
    if (this.props.track)
      this.setState({timer: setInterval(this.update, 100)});
  }

  update = () => {
    this.setState({update: !this.state.update});
  }
  /*
  componentDidUpdate(prevProps, prevState, snapshot){
    if (!props.track){
      clearInterval(this.timer)
      this.timer = null;
    }
    else{
      if (this.timer == null)
        this.timer = setInterval(this.update, 100);
    }
  }
*/
  render() {
    const { track } = this.props;
    if (!track) return null;
    let s = ~~((new Date() - new Date(track.begin)) / 1000);
    let m = ~~(s / 60); s %= 60;
    return (
      <div className="timer">
        <h3>{track.name}</h3>
        <i className="far fa-clock"></i>
        <span>{m}:{s < 10 ? '0' + s : s}</span>
        <button className="timer__button">Stop</button>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  track: store.user.track
})

export default connect(mapStateToProps)(Timer);
