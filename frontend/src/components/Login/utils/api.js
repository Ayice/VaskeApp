import axios from 'axios'

export async function postLogin(data) {
	const response = await axios.post('/user/login', data)

	return response.data
}
