
function stringifyObject(obj){
  const objSet = new Map();

  function __stringifyParam(val){
    const type = typeof val;
    switch (type) {
      case 'function':
          params.push([key, `${val.name} [function]`]);
        break;
      case 'object':
        if (val instanceof Date)
          params.push([key, `#${val.toUTCString()}#`]);
        else if (val instanceof RegExp){
          params.push([key, val.toString()]);
        }
        else if (Array.isArray(val)){
          return `[${val.map(item => __stringifyParam(item))}]`
        }
        else
        return __stringifyObject(val)
      default:
        break;
    }
  }

  function __stringifyObject(obj) {
    if (objSet.has(obj)) return `[Link][${objSet.get(obj)}]`;
    objSet.add(obj, objSet.size);

    let params = [];
    for (let key in obj){
      params.push([key, __stringifyParam(obj[key])]);
    }
    return '{' + params.sort((a, b) => a[0] < b[0]).map( param => `"${param[0]}":${param[1]}`).join(',') + '}';
  }

  return __stringifyParam(obj);
}

class ActionChannel extends WebSocket{
  __listeners__ = new Map();

  constructor (url){
    super(url);
  }
  
  subscribe(channel, callback, args = {}){
    const identifier = stringifyObject({ ...args, channel });
    if (!this.__listeners__.has(identifier))
      this.__listeners__.set(identifier, []);
    const listeners = this.__listeners__.get(identifier);
    sendCommand('subscribe', { ...args, channel });
    listeners.push(callback);
  }

  unsubscribe(channel, callback, args = {}){
    const identifier = stringifyObject({ ...args, channel });
    if (this.__listeners__.has(identifier)){
      const listeners = this.__listeners__.get(identifier);
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === callback){
          listeners.splice(i, 1);
          break;
        }
      }
      if (listeners.length === 0){
        this.__listeners__.delete(identifier);
      }
    }
  }

  sendCommand(command, data){
    this.send(JSON.stringify({
      command: command,
      identifier: JSON.stringify(data)
    }));
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

//singleton
const channel = new ActionChannel;
export default channel;
