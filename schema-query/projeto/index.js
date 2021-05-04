const { ApolloServer, gql } = require('apollo-server')

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

    # Pontos de entrada da sua API
    type Query {
        ola: String
        horaAtual: Date
        usuarioLogado: Usuario

    }
`

const resolvers = {
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
                salario: 1234.56,
                vip: true
            }
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