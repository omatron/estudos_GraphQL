const { perfis } = require('../data/db')

module.exports = {
    salario(usuario) {
        return usuario.salario_real
    },
    perfil(usuario) {
        const prfs = perfis
            .filter( p => p.id === usuario.perfil_id)
        return prfs ? prfs[0] : null
    }
}