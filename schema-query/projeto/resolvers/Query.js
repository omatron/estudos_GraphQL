const { usuarios, perfis } = require("../data/db")

module.exports = {
        ola() {
            return 'String'
        },
        horaAtual() {
            return `${new Date}`
        },
        usuarioLogado() {
            return {
                uid: 1,
                nome: "Admin",
                email: 'admin@server.com',
                idade: 20,
                salario_real: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Note',
                preco: 1.1,
                desconto: 0.15

            }
        },
        numerosMegaSena() {
            //return [1, 1, 2, 3, 5, 8, 13]
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente)
        },
        usuarios() {
            return usuarios
        },
        usuario(_, { uid }) {
            const sels = usuarios
                .filter( u => u.uid === uid)
            return sels ? sels[0] : null
        },
        perfis() {
            return perfis
        },
        perfil(_, { id }) {
            const prfs = perfis
                .filter( p => p.id === id)
            return prfs ? prfs[0] : null

        }
    }