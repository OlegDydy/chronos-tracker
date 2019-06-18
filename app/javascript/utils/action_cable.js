
class ActionChannel extends WebSocket{
  __listeners__ = {};

  constructor (url){
    super(url);
  }
  
  subscribe(channel, callback){
    sendCommand('subscribe', { channel });

  }

  sendCommand(command, data){
    this.send(JSON.stringify({
      command: command,
      identifier: JSON.stringify(data)
    }))
    this.__listeners__[command] = [];
  }

  onmessage = messageString => {
    const msg = messageString.data;
    const data = message.identifier;
    switch (msg.type) {
      case 'ping':
        // pong
        break;
      case 'confirm_subscription':
        if (data.channel in this.__listeners__){
          console.log(`Channel ${data.channel} Connected`);
          this.__listeners__[data.channel] = [];
        }
        else {
          console.error(`Unknown Channel subscription confirmation got for channel ${data.channel}`);
        }
        break
      default:
        console.log(`Received message: ${messageString.data}`);
        break;
    }
  }
}