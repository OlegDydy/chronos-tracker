
export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  UPDATE: 'PATCH',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

const CSRFParam = document.getElementsByName('csrf-param')[0].content;
const CSRF = document.getElementsByName('csrf-token')[0].content;
document.head.removeChild(document.getElementsByName('csrf-token')[0]);
document.head.removeChild(document.getElementsByName('csrf-param')[0]);

export function request(action, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(action, url)
    if (typeof data === 'object')
      xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('X-CSRF-Param', CSRFParam)
    xhr.setRequestHeader('X-CSRF-Token', CSRF)

    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return undefined
      let obj = null;
      try {
        obj = JSON.parse(xhr.responseText);
        if (obj.status === 'ok')
          resolve(obj);
        else
          reject(obj);
      } catch (error) {
        // not json
        reject({
          status: 'ServerError',
          httpStatus: xhr.status,
          httpStatusText: xhr.statusText,
          message: xhr.responseText
        })
      }
    }
    if (typeof data === 'object')
      xhr.send(JSON.stringify(data))
    else if (typeof data === 'string')
      xhr.send(data)
    else
      xhr.send()
  })
}
