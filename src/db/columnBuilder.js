import { knex } from './knex.js'

export function applyColumn(t, name, config) {
  let col

  switch (config.type) {
    case 'increments':
      col = t.increments(name)

      break

    case 'string':
      col = t.string(name)

      break

    case 'timestamp':
      col = t.timestamp(name)

      break

    default:
      throw new Error(`Tipo não suportado: ${config.type}`)
  }

  if (config.primary) col.primary()

  if (config.notNullable) col.notNullable()

  if (config.unique) col.unique()

  if (config.defaultToNow) col.defaultTo(knex.fn.now())

  if (config.defaultTo !== undefined) col.defaultTo(config.defaultTo)
}

export function applyColumns(t, columns) {
  for (const [name, config] of Object.entries(columns)) {
    applyColumn(t, name, config)
  }
}
