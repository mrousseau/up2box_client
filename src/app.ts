import { UptoboxClient } from "./controller/uptobox";


async function main() {
    console.log('----- start -----');

    const o = new UptoboxClient();
    
    const link = await o.GetLink('https://uptobox.com/8nydl8ahccnm');
    console.log(`link => ${link}`);
    o.Download(link);
    
}

main();