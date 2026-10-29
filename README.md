# Órbita IoT

Site de estudo em React, TypeScript e Tailwind CSS. Sem backend ou APIs pagas.

## Abrir imediatamente

Depois de instalar as dependências e gerar a versão de produção com `npm ci` e `npm run build`, dê dois cliques em **Abrir site.cmd**. Ele serve a versão pronta em http://127.0.0.1:4173 e abre o navegador. Mantenha a janela aberta enquanto estuda. Requer Node.js já instalado. Não precisa de internet ou contas.

## Executar em desenvolvimento no Windows

Abra um terminal nesta pasta e execute:

    npm.cmd install
    npm.cmd run dev

Abra a URL exibida pelo Vite. Para gerar a versão de produção:

    npm.cmd run build
    npm.cmd run preview

## Publicar na Vercel

1. Importe o repositório `AdrielCampos134/revisaoIOT`.
2. Use o diretório raiz `.` e o framework **Vite**.
3. Build: `npm run build`. Saída: `dist`.
4. Clique em **Deploy**. Não precisa configurar variáveis de ambiente.

O arquivo `vercel.json` já define o framework, o build e a pasta de saída. A navegação usa fragmentos de URL, por isso não exige regras de redirecionamento.

## Funcionalidades

- Oito módulos, tabelas e exemplos.
- Quiz de 40 questões com correção imediata e prática por tópico.
- Simulado de 20 questões aleatórias, correção ao finalizar e nota de 0 a 10.
- Cinco situações práticas adaptadas do resumo fornecido.
- Resumão e 16 flashcards com marcação de aprendidos.
- LocalStorage para leituras, sessões, resultados e flashcards. Os dados ficam no navegador e na origem utilizada.

## Material pendente

O PDF “Lista de Exercícios de Revisão – Internet das Coisas (IoT)” não estava na pasta durante a implementação. A seção prática usa enunciados e perguntas adaptados das cinco situações descritas pelo usuário e informa isso na interface. Para fidelidade ao PDF, substitua os campos de cases em src/data.ts após fornecer o arquivo. Referências técnicas ficam na aba Revisão rápida.

## Verificação

    npm.cmd test
    npm.cmd run build
