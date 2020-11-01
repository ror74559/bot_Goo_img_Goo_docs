const puppeteer = require('puppeteer')
const fs = require('fs')


async function paste_images(){

  const url = 'https://docs.google.com/document/d/1hs9GhMzrmzCXdOEBjxsACt888R5Gw6gfCrtkCo5M5U0/edit?usp=sharing'
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless:false,
  });
  await console.log('Iniciando browser...')

 // incicia browser
  const page = await browser.newPage()
  // acessa o link da página descrita

  await console.log('Iniciando Navegação para a página...')

  await page.goto(url)

  await page.waitForTimeout(4000)


  // clica no aviso inicial

  await console.log('Clicando no aviso inicial...')

  await page.click('span.docs-butterbar-dismiss')

  // Lê arquivo e coloca os dados como string na variável data

  await console.log('Fazendo leitura do arquivo com os links...')

  const data = await fs.readFileSync('./imagens.json', 'utf-8', function(err, data){

        if(err) throw err;
    
   });
      
 //Passa a string que está na variável data para json e coloca os dados na variável linkImg

  const linkImg = await JSON.parse(data)

  const clock = 500
      
  await console.log('Iniciando colagem de imagemns no Google docs...')
  //--------------------------------------------------------------------------------------
  for(let i = 0; i < 5; i++){
  
    // clica no INSERIR para abrir o submenu

    await page.click('#docs-insert-menu')
    
    //seleciona o item IMAGEM no submenu, acessando o primeiro item de um segundo submenu
    await page.keyboard.press('Alt')
    await page.keyboard.press('I')

    // Seta para baixo duas vezes para pular dois itens e chegar no item para inserir imagem por link 
    
    await page.waitForTimeout(clock)
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(clock)
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(clock)
    // enter para acessar o modal para inserir o link
    await page.keyboard.press('Enter')
    await page.waitForTimeout(clock)
    //aumenta tamanho da imagem substituindo no link /s400 por /s800
    if(linkImg[i].src[0] != 'h' && linkImg[i].src[1] != 't'){
      console.log(`${i}° link com formato incorreto`)
      await page.waitForTimeout(clock+ 1500)
      await page.keyboard.press('Tab')
      await page.waitForTimeout(clock)
      await page.keyboard.press('Enter')

    }else{
      await page.waitForTimeout(clock)
      let imagem = await linkImg[i].src
     // insere o link no input do modal
     
      await page.keyboard.sendCharacter(imagem)
      await console.log(`Inserindo ${i + 1}° imagem...`)
      await page.waitForTimeout(clock)
      await page.waitForTimeout(clock)
      // Enter para confirmar 
      await page.keyboard.press('Enter')
      // espera de dois segundos 
      await page.waitForTimeout(clock + 3500)// espera para carregar modal
      //Passos para clicar no botão inserir
      await page.keyboard.press('Tab')
      await page.waitForTimeout(clock)
      await page.keyboard.press('Tab')
      await page.waitForTimeout(clock)
      await page.keyboard.press('Tab')
      await page.waitForTimeout(clock)
      await page.keyboard.press('Enter')
      await page.waitForTimeout(clock)
      await page.waitForTimeout(clock)

      }
    
    
  }
  console.log('Finalizado!!!!!')

}

module.exports = paste_images
