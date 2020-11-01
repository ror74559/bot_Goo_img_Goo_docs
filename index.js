const scrape_images = require('./bots/scrape_images.js');

const paste_images = require('./bots/paste_images.js');

async function iniciar(){

	await scrape_images();

	await console.log('Abrindo navegador para iniciar o redimensionamento e a colagem das imagens...')

	await paste_images()

}

iniciar()




