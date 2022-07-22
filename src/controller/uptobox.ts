import axios from 'axios';
import * as fs from 'fs';
import { config } from '../config/config';
import { exec } from 'child_process';

export class UptoboxClient {
constructor() {}

    async GetLink(url:string) {
        console.log('-- GetLink ')
        console.log(`- url : ${url}`)
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
            const uptbxReturn = response.data;
            link = uptbxReturn.data.dlLink;
        })
        .catch(function (error) {
            console.log(`error`);
        });

        console.log(`- link : ${link}`);
        return link;
    }

    async Download(link: string) {
        console.log(`-- Download : ${link}`)
        const array: string[] = link.split('/')
        const file = array[array.length -1];

        const path = config.path !='' ? config.path : './tmp'

        console.log(`- file name : ${file}`);
        const rest = await axios.get(link, {responseType: 'arraybuffer', onDownloadProgress: progressEvent => console.log(progressEvent.loaded)});
        await fs.promises.writeFile(`${path}/${file}`, rest.data); 
    }

}
