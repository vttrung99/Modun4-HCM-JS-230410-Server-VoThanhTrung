## Ghi chú:
- Setup express (npm i express) // Framework của node js để build server
- Setup type express (npm i --save-dev @types/express) // Type của expresss cho typescript
- Setup ts-node (npm install -D ts-node or npm i ts-node --save-dev) // thư viện giúp chạy trực tiếp file ts không cần build js.

## ORM

## 1 TypeORM
- Type ORMS
- npm i typeorm mysql reflect-metadata --save

## 2 Prisma

- npm i prisma
- npm i @prisma/client
- Setup path schema.prisma in package.json =>  

"prisma": {
    "schema": "./src/prisma/schema.prisma"
}

- Setup create database, client:

"db": "prisma db push",
"client": "prisma generate"

## Mail

npm i nodemailer @types/nodemailer