const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id: 1,
    nome: 'Joao',
    email: 'jsilva@zmail.com',
    idade: 29
},
{
    id: 2,
    nome: 'Rafael',
    email: 'rsilva@zmail.com',
    idade: 21
},
{
    id: 3,
    nome: 'Daniela',
    email: 'dsilva@zmail.com',
    idade: 30
}]

const typeDefs = gql`
scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
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
                id: 1,
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