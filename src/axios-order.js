import axios from 'axios'

const instance =axios.create({
    baseURL:'https://burger-ed778.firebaseio.com/'
});


export default instance