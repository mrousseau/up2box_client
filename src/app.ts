import { UptoboxClient } from "./controller/uptobox";

var args = process.argv.slice(2);

async function main(args:string[]) {
    console.log('----- start -----');
    if(args.length > 0 && args.length <=1) {

        const url = args[0];
        const o = new UptoboxClient();
    
        const link = await o.GetLink(url);
        o.Download(link); 
    }
    else {
        console.log('no input parameter');
    }
    

    
    
}

main(args);