const config = {
  baseUrl: 'https://68778211dba809d901efb9ef.mockapi.io/paints',
}

export const loadingCardData = () => {
  return fetch(`${config.baseUrl}/paint`, {
    method: 'GET',
    headers: {'content-type':'application/json'},
  }).then(res => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}
