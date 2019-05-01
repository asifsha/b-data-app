
import axios from 'axios';

export default class ServiceApi {
    static baseUrl = 'https://blockchain.brickblock.io/inputs';

    static getData() {
        return new Promise((resolve, reject) => {


            axios.get(ServiceApi.baseUrl)
                .then(function (response) {                    
                    if (response.data != null)
                        resolve(response.data);
                    resolve({});
                }).catch(function (error) {
                    console.log(error);
                    reject(error);
                });


        });
    }    

}
