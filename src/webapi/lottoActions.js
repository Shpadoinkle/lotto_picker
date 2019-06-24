import axios from 'axios';

const fetchRequest = (request) => {
    return new Promise((resolve, reject) => {
        axios(request).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    });
}

export const lottoActions = {
    getLastPowerball: (data) => {
        let url = "https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults";
        const request = {
            method: 'POST',
            url,
            data: {
                CompanyId: "GoldenCasket",
                MaxDrawCountPerProduct: 1,
                OptionalProductFilter: ["Powerball"]
            }
        };
        return fetchRequest(request);
    }
}