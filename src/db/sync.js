import { applyColumn, applyColumns } from './columnBuilder.js'
import { knex } from './knex.js'
import { models } from './registry.js'

export async function syncAllModels() {
  for (const model of models) {
    await syncTable(model)
  }
}

async function syncTable(model) {
  const { table, columns } = model

  const hasTable = await knex.schema.hasTable(table)

  if (!hasTable) {
    await knex.schema.createTable(table, t => {
      applyColumns(t, columns)
    })

    console.log(`✔ Tabela ${table} criada`)

    return
  }

  const missingColumns = []

  for (const columnName of Object.keys(columns)) {
    const exists = await knex.schema.hasColumn(table, columnName)

    if (!exists) missingColumns.push(columnName)
  }

  if (!missingColumns.length) {
    console.log(`✔ ${table} sincronizada`)

    return
  }

  await knex.schema.alterTable(table, t => {
    for (const name of missingColumns) {
      applyColumn(t, name, columns[name])

      console.log(`➕ ${table}.${name}`)
    }
  })
}
