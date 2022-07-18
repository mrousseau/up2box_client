import axios from 'axios';
import * as fs from 'fs';
import { config } from '../config/config';
export class UptoboxClient {
constructor() {}

    async GetLink(url:string) {
        console.log('----- GetLink ')
        console.log(`-- url : ${url}`)
        const array =url.split('/');
        const code = array[array.length-1];
        let link = '';   

        var param = {
            method: 'get',
            url: `https://uptobox.com/api/link?file_code=${code}&token=${config.token}`,
            headers: { }
        };

        await axios(param)
        .then(function (response) {
            console.log('then')
            const uptbxReturn = response.data;
            console.log(uptbxReturn);
            link = uptbxReturn.data.dlLink;
        })
        .catch(function (error) {
            console.log(`error`);
        });

        console.log(`link : ${link}`);
        return link;
    }

    Download(link: string) {
        console.log(`----- Download : ${link}`)
        const array: string[] = link.split('/')
        const file = array[array.length -1];

        console.log(`-- file name : ${file}`);
        axios.get(link, {responseType: 'blob'}).then(response => {
        fs.writeFile(`./tmp/${file}`, response.data, (err) => {
        if (err) console.log('error ', err);
        console.log('The file has been saved!');
    });
});
    }

}