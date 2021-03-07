'use strict'

const Person = use('App/Models/Person')
class PersonController {

    //Listing all users
    async index({view}) {
        const persons = await Person.all();
        return view.render('home', {
            persons: persons.toJSON()
        })
    }
}

module.exports = PersonController
