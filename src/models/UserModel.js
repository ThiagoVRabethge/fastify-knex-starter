import { defineModel } from '../db/registry.js'

defineModel({
  table: 'users',
  columns: {
    id: {
      type: 'increments',
      primary: true
    },
    login: {
      type: 'string',
      notNullable: true,
      unique: true
    },
    password: {
      type: 'string',
      notNullable: true
    },
    created_at: {
      type: 'timestamp',
      defaultToNow: true
    },
    updated_at: {
      type: 'timestamp',
      defaultToNow: true
    }
  }
})
