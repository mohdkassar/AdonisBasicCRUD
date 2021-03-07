'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonFriendSchema extends Schema {
  up () {
    this.create('person_friends', (table) => {
      table.increments()
      table.integer('user_id', 25).unsigned().references('id').inTable('people');
      table.integer('following', 25).unsigned().references('id').inTable('people');
      table.timestamps()
    })
  }

  down () {
    this.drop('person_friends')
  }
}

module.exports = PersonFriendSchema
