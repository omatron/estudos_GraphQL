const usuarios = [{
    uid: 1,
    nome: 'Joao',
    email: 'jsilva@zmail.com',
    idade: 29,
    perfil_id: 1
},
{
    uid: 2,
    nome: 'Rafael',
    email: 'rsilva@zmail.com',
    idade: 21,
    perfil_id: 2
},
{
    uid: 3,
    nome: 'Daniela',
    email: 'dsilva@zmail.com',
    idade: 30,
    perfil_id: 1
}]

const perfis = [{
    id: 1,
    nome: 'Admin'
},
{
    id: 2,
    nome: 'Usuário'
}]

module.exports = { usuarios, perfis }