import axios from 'axios';
import store from '../../../store/index';

export async function postNewMachine(machine) {

  const response = await axios.post(`${store.getters.apiUrl}machine`, machine,
    {
      headers: { 'auth-token': store.state.userToken }
    });

  return response.data;
}
