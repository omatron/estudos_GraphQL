const { ApolloServer, gql } = require('apollo-server')

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

const typeDefs = gql`
scalar Date

    type Usuario {
        uid: Int
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        perfil: Perfil
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    # Pontos de entrada da sua API
    type Query {
        ola: String
        horaAtual: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
        usuario(uid: Int): Usuario
        perfil(id: Int): Perfil
        perfis: [Perfil]
    }

    type Perfil {
        id: Int
        nome: String
    }

    
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) { 
            if(produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        },
        perfil(usuario) {
            const prfs = perfis
                .filter( p => p.id === usuario.perfil_id)
            return prfs ? prfs[0] : null
        }
    },
    Query: {
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
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})