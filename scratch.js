const fs = require('fs');
const changeCase = require('change-case')

// Read manifest
let manifest = require('./manifest.json');

manifest.map(m => {
	m.title = changeCase.title(m.title);
	return m
})


fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 4));
