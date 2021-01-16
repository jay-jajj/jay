import axios from 'axios';
import {
  CREATE_POST,
  READ_POST,
  UPDATE_POST,
  DELETE_POST
} from './types';
import { POST_SERVER } from '../components/Config.js';

export function createPost(dataToSubmit){
    const request = axios.post(`${POST_SERVER}/create`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: CREATE_POST,
        payload: request
    }
}

export function readPost(dataToSubmit){
    const request = axios.post(`${POST_SERVER}/read`,dataToSubmit)
                .then(response => response.data);

    return {
        type: READ_POST,
        payload: request
    }
}

export function updatePost(){
    const request = axios.get(`${POST_SERVER}/update`)
    .then(response => response.data);

    return {
        type: UPDATE_POST,
        payload: request
    }
}

export function deletePost(){
    const request = axios.get(`${POST_SERVER}/delete`)
    .then(response => response.data);

    return {
        type: DELETE_POST,
        payload: request
    }
}

