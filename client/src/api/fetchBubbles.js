import axiosWithAuth from '../api/axiosWithAuth'

export const fecthBubbles = (setColorList)=> {
    axiosWithAuth()
    .get('/colors')
    .then(res => {
      console.log(res);
      setColorList(res.data);
    })
    .catch(err => {
      console.log(err.response)
    })
}

