import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {spawn} from 'node:child_process';
const dir=path.resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const port=4173;
const origin='http://127.0.0.1:'+port;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
try{
const pathname=decodeURIComponent(new URL(req.url,origin).pathname);
const file=path.resolve(dir,'.'+(pathname==='/'?'/index.html':pathname));
if(file!==dir&&!file.startsWith(dir+path.sep)){res.writeHead(403);res.end();return;}
if(!(await stat(file)).isFile())throw Error('not a file');
const data=await readFile(file);
res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
res.end(req.method==='HEAD'?undefined:data);
}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Arquivo não encontrado.');}
});
server.on('error',error=>{console.error('Não foi possível abrir o site:',error.message);console.error('Se já estiver aberto, acesse '+origin);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>{
console.log('\nÓrbita IoT está pronto: '+origin+'\nMantenha esta janela aberta enquanto estuda. Ctrl+C para encerrar.\n');
if(process.argv.includes('--open')){
if(process.platform==='win32')spawn('cmd.exe',['/d','/c','start','',origin],{windowsHide:true,stdio:'ignore'});
}
});
