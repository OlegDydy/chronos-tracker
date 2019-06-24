
const mouse = {
  client:{
    x:0, y:0,
  },
  page:{
    x:0, y:0,
  },
  buttons: {
    mbLeft: false,
    mbRight: false,
    mbMiddle: false
  },
  alt: false,
  ctrl: false,
  shift: false,

  /// mouse position x
  get x(){
    return this.client.x;
  },

  /// mouse position y
  get y(){
    return this.client.y;
  }
}

export default mouse;

document.addEventListener('mousemove', e => {
  mouse.buttons.mbLeft = e.button & 0x01 != 0;
  mouse.buttons.mbRight = e.button & 0x02 != 0;
  mouse.buttons.mbMiddle = e.button & 0x04 != 0;
  mouse.alt = e.altKey;
  mouse.ctrl = e.ctrlKey;
  mouse.shift = e.shiftKey;
  mouse.client.x = e.clientX;
  mouse.client.y = e.clientY;
  mouse.page.x = e.pageX;
  mouse.page.y = e.pageY;
});
