import Axios from "axios";
import { base_url, api_header, formdata_api_header } from "../constants";

export const apiClient = Axios.create(
    {
        baseURL: base_url,
        headers: api_header,
    }
)

export const formDataApiClient = Axios.create(
    {
        baseURL: base_url,
        headers: formdata_api_header
    }
)

