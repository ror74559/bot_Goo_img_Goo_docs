const puppeteer = require('puppeteer')
const fs = require('fs')


//Robo acessa o site e captura o link das imagens do site
async function scrapeImages(){

    const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless:false,
     })

    const page = await browser.newPage()

    await page.setViewport({ width: 1035, height: 768 })

    console.log('Acessando a página web...')

    const pesquisa = 'casa'

    await page.goto('https://www.google.com/imghp?hl=pt-BR');

    await page.keyboard.sendCharacter(pesquisa)

    await page.keyboard.press('Enter')

    const quant_imagens = 5

    console.log('Preparando para a captura dos links das imagens...')

    await page.waitForTimeout(2000)

    let imagens = []

    

    for(let i = 0; i < 5; i++){

        await page.waitForTimeout(2000)

        await page.keyboard.press('ArrowRight')

        await page.waitForTimeout(2000)
        if(i == 0){
            await page.keyboard.press('Enter')

        }
        
        await page.waitForTimeout(2000)

        imagens.push(await page.evaluate(async() =>{

            let link = await document.querySelectorAll('div.v4dQwb > a> img')

            let data = [...link]

            const imglist = await data.map(({src})=>({
            src
            }));

            return imglist[0]

            }
         
        ))
        await page.waitForTimeout(3000)
         
    }
    
    await console.log(imagens)

    await page.waitForTimeout(2000)
    fs.writeFile('imagens.json',JSON.stringify(imagens,null,2), err =>{
        if(err) throw new Error('Erro ao criar arquivo')

        console.log('Arquivo criado!')
    });


    await browser.close()
};



module.exports = scrapeImages;








  //-------------------------------------------------------------------------------------------------

