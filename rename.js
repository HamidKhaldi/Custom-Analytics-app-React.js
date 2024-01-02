var fs = require('fs');

var input = process.argv[2];
var output = process.argv[3];
var environment = process.argv[4];

let pathString;
//pathString = 'siteUrl/SiteAssets/Pages/static';
switch (environment) {
    case "test":
        pathString = 'siteUrl/SiteAssets/Test-Site/Pages/static';
        break;
    case "live":
        pathString = 'siteUrl/SiteAssets/Pages/static';
        break;

    default:
        break;
}


var content = fs.readFileSync(input, 'utf8');
// console.log(content);
// take test site of of all urls  
// siteUrl/SiteAssets/Pages/static

// 2) partial called 'sharepoint.css' including all overrides / hide for sharepoint csss....


var newStr = content.replace(/static/g, pathString);

// console.log('pathString', newStr);

newStr = newStr.replace(/\/https/g, 'https');
newStr = newStr.replace(/\/manifest.json/g, '');

fs.writeFileSync(output, newStr);