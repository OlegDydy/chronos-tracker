import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stopTrack } from "../actions/user";

class Timer extends Component {
  timer = null;
  
  constructor(props){
    super(props);

    this.timer = setInterval(() => this.forceUpdate(), 100);
  }

  update = () => {
    this.setState({update: !this.state.update});
  }

  render() {
    const { track, stopTrack } = this.props;
    if (!track) return null;
    let s = ~~((new Date() - new Date(track.begin)) / 1000);
    let m = ~~(s / 60); s %= 60;
    return (
      <div className="timer">
        <h3>{track.name}</h3>
        <i className="far fa-clock"></i>
        <span>{m}:{s < 10 ? '0' + s : s}</span>
        <button className="timer__button" onClick={() => stopTrack(track.id)}>Остановить</button>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  track: store.user.track
})

const mapDispatchToProps = dispatch => ({
  stopTrack: trackId => dispatch(stopTrack(trackId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
