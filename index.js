const scrape_images = require('./scrape_images.js');

const paste_images = require('./paste_images.js');

async function iniciar(){

	await scrape_images();

	await console.log('Abrindo navegador para iniciar o redimensionamento e a colagem das imagens...')

	await paste_images()

}

iniciar()




