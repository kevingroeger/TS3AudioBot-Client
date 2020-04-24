const config = window.require('electron-json-config')
const apiKey = config.get('apiKey', window.Configs.apiKey)
const baseUrl = config.get('baseUrl', window.Configs.baseUrl)

// api key implementation
export const fetchApi = async (url) => {
  if (apiKey !== '' && apiKey) {
    const bufferStr = new Buffer(apiKey)
    const response = await fetch(url,
      {
        headers: {
          'Authorization': `Basic ${bufferStr.toString('base64')}`
        }
      }
    )
    return getResponse(response)
  } else {
    const response = await fetch(baseUrl + url)
    return getResponse(response)
  }
}

const getResponse = (response) => {
  try {
    if (response.headers.get('Content-Type') === 'application/json') {
      return response.json()
    } else {
      return response
    }
  } catch (e) {
    if (response.status === 422) {
      return 'none'
    } else {
      console.error(e)
    }
  }
}