import axios from "axios";
import querystring from "querystring";

class BikesService {
    get = () => {
        return axios.get(`${process.env.API_URL}/bikes`);
    };

    post = (model) => {
        return axios.post(`${process.env.API_URL}/bikes`, querystring.stringify(model));
    };

    patch = (model) => {
        return axios.patch(
            `${process.env.API_URL}/bikes/${model.id}`,
            querystring.stringify(model)
        );
    };

    postRent = (id) => {
        return axios.post(
            `${process.env.API_URL}/bikes/${id}`,
            querystring.stringify({ isRented: true })
        );
    };

    cancelRent = (id) => {
        return axios.post(
            `${process.env.API_URL}/bikes/${id}`,
            querystring.stringify({ isRented: false })
        );
    };

    delete = (id) => {
        return axios.delete(`${process.env.API_URL}/bikes/${id}`);
    };
}

export default BikesService;
