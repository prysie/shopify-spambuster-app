export const fetch = (url, options) => {
  return window.fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export const get = (url) => {
  return fetch(url, {
    method: 'GET'
  })
}

export const post = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
