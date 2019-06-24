
const dataList = []

export function startDrag( node, data ){
  node.classList.add('drag');
  dataList.push({ node, data })
}

export function stopDrag(){
  dataList.length = 0;
}

document.addEventListener('mousemove', e => {
  dataList.forEach( i => {
    i.left = e.clientX,
    i.top = e.clientY
  });
});
