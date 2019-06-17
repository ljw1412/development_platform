import vue from '../main'
import axios from 'axios'
import url from 'url'
import qs from 'qs'

const methodList = ['get', 'post', 'put', 'patch', 'options', 'head', 'delete']

const locationUrl = url.parse(window.location.origin)
const base = locationUrl.protocol + '//' + locationUrl.hostname

axios.defaults.baseURL = `${base}:3333/`
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true

function printError({ method, api, param, config, error }) {
  console.error(`${method.toUpperCase()} ["${api}"] 调用失败: ${error.message}`)
  console.log(JSON.stringify({ api, param, config }, null, 2))
}

// dispose request parameters
function disposeParam(method, param) {
  switch (method) {
    case 'get':
      return { params: param }
    case 'post':
      return qs.stringify(param)
  }
  return param
}

const callApi = ({ method = 'get', api, param, config = {} } = {}) => {
  const $ = axios.create(config)
  if (!methodList.includes(method.toLowerCase())) {
    method = methodList[0]
  }
  const mParam = disposeParam(method, param)
  return $[method](api, mParam)
    .then(data => {
      return Promise.resolve(data.data)
    })
    .catch(error => {
      printError({ method, api, param, config, error })
      return Promise.reject(error)
    })
}

export default callApi
