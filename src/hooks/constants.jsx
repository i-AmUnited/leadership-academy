import toast from "react-hot-toast";

export const base_url = 'http://tlao.ristherhen.com/tlao_api/v1/api/';

export const api_header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-api-key': '643211'
}

export const formdata_api_header = {
    'Content-type': 'multipart/form-data',
    'x-api-key': '643211'
}

export const showSuccessToast = (message) => {
    toast.success(message);
    return null
}

export const showErrorToast = (message) => {
    toast.error(message);
    return null
}