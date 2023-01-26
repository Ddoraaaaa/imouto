// const translator = require('@parvineyvazov/json-translator');
const translator = require('./json-translator.cjs.development');
const proxy_check = require('proxy-check');
const fs = require('fs');

// const proxy = 'y0adXjeO:pAzAHCr4@54.82.74.24:5557';

// proxy_check(proxy).then(r => {
//   console.log(r); // true
// }).catch(e => {
//   console.error(e); // ECONNRESET
// });

async function readProxyFile(file_path) {
  const confs = {
    checkerRX: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}:(\d){1,}$/,
  };
  const data = await fs.promises.readFile(file_path, 'utf8');
  if (!data) {
    error('proxy file is empty!');
    return;
  }

  let proxyList = data.split(/\r?\n/);

  proxyList = proxyList.filter(proxy_item => confs.checkerRX.test(proxy_item));

  // success(`\n---------------- Proxy Mode ----------------\n`);
  global.proxyList = proxyList;
  console.log(global.proxyList);
}

fs.readdir('./src', (err, files) => {
  if (err) {
    throw err
  }
  // readProxyFile('./proxy.txt');

  // files object contains all files names
  // log them on console
  files.forEach(async file => {
    console.log(file);
    await translator.translateFile(
      './src/' + file,
      translator.languages.Japanese,
      translator.languages.English
    );
    fs.rename('./src/en.json', './dest/' + file, function (err) {
      if (err) throw err
      console.log('Done', file);
    })
    // fs.unlink('./src/' + file, function (err) {
    //   if (err) throw err
    //   console.log('Done', file);
    // });
  })
})
