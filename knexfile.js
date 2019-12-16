module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/ninja-coder-bootcamp-v1-test',
    migrations: {
      directory: __dirname + 'apps/bootcamp-api/db/migrations'
    },
    seeds: {
      directory: __dirname + '/apps/bootcamp-api/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ninja-coder-bootcamp-v1-dev',
    migrations: {
      directory: __dirname + '/apps/bootcamp-api/db/migration'
    },
    seeds: {
      directory: __dirname + '/apps/bootcamp-api/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: 'postgres://localhost/' + process.env.POSTGRES_DATABASE,
    migrations: {
      directory: __dirname + '/apps/bootcamp-api/db/migration'
    },
    seeds: {
      directory: __dirname + '/apps/bootcamp-api/db/seeds/production'
    }
  }
};