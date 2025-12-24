import { defineModel } from '../db/registry.js'

defineModel({
  table: 'users',

  columns: {
    id: { type: 'increments', primary: true },
    name: { type: 'string', notNullable: true },
    email: { type: 'string', notNullable: true, unique: true },

    jataatesemgraca: {
      type: 'string',
      notNullable: true,
      defaultTo: ''
    },

    created_at: { type: 'timestamp', defaultToNow: true },
    updated_at: { type: 'timestamp', defaultToNow: true }
  }
})
