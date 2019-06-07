
export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT'
}

const CSRFParam = document.getElementsByName('csrf-param')[0].content;
const CSRF = document.getElementsByName('csrf-token')[0].content;
document.head.removeChild(document.getElementsByName('csrf-token')[0]);
document.head.removeChild(document.getElementsByName('csrf-param')[0]);

export function request(action, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(action, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('X-CSRF-Param', CSRFParam)
    xhr.setRequestHeader('X-CSRF-Token', CSRF)

    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return undefined
      
      if (xhr.status === 200)
      resolve(xhr.responseText);
      else
      reject(xhr.responseText || { status: xhr.status, error: xhr.statusText })
    }
    xhr.send(JSON.stringify(data))
  })
}
