const fs = require('fs');
const pug = require('pug');
const changeCase = require('change-case');

// Read manifest
let manifest = require('./manifest.json');

// Read files
let files = fs.readdirSync('./audio').filter(f => f != '.DS_Store');

for (var i = 0; i < files.length; i++) {
	let f = files[i];
	fs.renameSync('./audio/' + f, './audio/' + f.split(' ').join('_').toLowerCase());
}

files = files.map(f => f.split(' ').join('_').toLowerCase());

files.forEach(f => {

	// Add new files
	if (manifest.findIndex(m => m.fileName == f) == -1) {
		manifest.push({
			date: '',
			title: changeCase.title(f.split('.')[0]),
			path: '../audio/' + f,
			fileName: f,
		});
	}

});

// Rewrite manifest

let html =  pug.renderFile(`./pug/index.pug`, { 
	pretty: true,
	files: manifest 
});

fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 4));
fs.writeFileSync('index.html', html);