import test from 'node:test';import assert from 'node:assert/strict';import React,{act} from 'react';import {createRoot} from 'react-dom/client';import {JSDOM} from 'jsdom';import App from '../src/App';import {questions} from '../src/data';
test('fluxos completos: conteúdo, quiz, persistência, simulado, casos e flashcards',async()=>{
const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'http://localhost/#home'});
for(const key of ['window','document','location','localStorage','HTMLElement','Event','MouseEvent'])Object.defineProperty(globalThis,key,{configurable:true,value:(dom.window as any)[key]});
(globalThis as any).IS_REACT_ACT_ENVIRONMENT=true;dom.window.scrollTo=()=>{};
const container=document.getElementById('root')!;let root=createRoot(container);
await act(async()=>root.render(React.createElement(App)));
const buttons=()=>Array.from(document.querySelectorAll('button'));
const click=async(label:string,exact=false)=>{const b=buttons().find(b=>exact?b.textContent?.trim()===label:b.textContent?.includes(label));assert.ok(b,'Botão '+label);assert.ok(!b.disabled,label+' habilitado');await act(async()=>b.click());};
const flush=async()=>{await act(async()=>{await new Promise(r=>setTimeout(r,20));});};
const saved=()=>JSON.parse(localStorage.getItem('orbita-iot-v1')!);
assert.ok(container.textContent?.includes('Pequenos dispositivos.'));
await click('Começar a estudar');await flush();assert.ok(container.textContent?.includes('Sensor → processamento → ação'),'abre aula a partir do início');
await click('Marcar como estudado');assert.deepEqual(saved().done,[1]);
await click('Praticar este tópico');await flush();assert.equal(saved().quiz.ids.length,5);
const first=questions.find(q=>q.id===saved().quiz.ids[0])!;await click(String.fromCharCode(65+first.answer)+first.options[first.answer],true);assert.ok(document.querySelector('[role="status"]')?.textContent?.includes('Boa!'));
await act(async()=>root.unmount());root=createRoot(container);await act(async()=>root.render(React.createElement(App)));assert.equal(saved().quiz.answers[first.id],first.answer);assert.ok(container.textContent?.includes('Boa!'),'feedback restaurado');
for(let i=1;i<5;i++){await click('Próxima questão');const s=saved().quiz;const q=questions.find(q=>q.id===s.ids[i])!;const answer=i===4?(q.answer+1)%4:q.answer;await click(String.fromCharCode(65+answer)+q.options[answer],true);}
await click('Ver resultado');assert.ok(container.textContent?.includes('8,0'),'nota quiz correta');assert.equal(saved().history[0].correct,4);
await click('Simulado',true);await flush();await click('Iniciar simulado');await flush();assert.equal(saved().exam.ids.length,20);
for(let i=0;i<20;i++){const q=questions.find(q=>q.id===saved().exam.ids[i])!;await click(String.fromCharCode(65+q.answer)+q.options[q.answer],true);assert.equal(document.querySelectorAll('.feedback').length,0,'não revela simulado');if(i<19)await click('Próxima questão');}
await click('Finalizar simulado');assert.ok(document.querySelector('[role="dialog"]'));await click('Ver resultado');assert.ok(container.textContent?.includes('10,0'));assert.equal(saved().history[1].correct,20);
await click('Questões práticas',true);await flush();assert.equal(document.querySelectorAll('.case-card').length,5);await click('Mostrar resposta comentada');assert.ok(document.querySelector('.case-answers'));await click('Ocultar resposta');assert.equal(document.querySelector('.case-answers'),null);
await click('Revisão rápida',true);await flush();await click('Flashcards');await act(async()=>document.querySelector<HTMLButtonElement>('.flashcard')!.click());assert.ok(document.querySelector('.flashcard.flipped'));await click('Já sei este conceito');assert.equal(saved().known.length,1);await click('Próximo',true);assert.equal(document.querySelector('.flashcard.flipped'),null);assert.deepEqual(saved().done,[1]);
await act(async()=>root.unmount());dom.window.close();
});