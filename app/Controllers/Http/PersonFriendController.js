'use strict'

const Person = use('App/Models/Person')
const PersonFriend = use('App/Models/PersonFriend')
const Database = use('Database')

class PersonFriendController {

    //List of recommendations
    async friends({params, view}) {
        const friends = await Database.from('person_friends').where('user_id', params.id).pluck('following')
        friends.push(params.id)
        const list = await Database.select('*').from('people').whereNotIn('id', friends)
        return view.render('person', {
            id:params.id,
            list: list
        })
    }

    //List of friends
    async friendslist({params, view}) {
        console.log('Friends List '+params.id)
        const friends = await Database.from('person_friends').where('user_id', params.id).pluck('following')
        const list = await Database.select('*').from('people').whereIn('id', friends)
        return view.render('friends', {
            id:params.id,
            list: list
        })
    }

    //Delete Friend
    async deleteFriend({request, view}) {
        console.log(request.all().person)
        await Database.table('person_friends').where({user_id:request.all().person, following:request.all().following}).delete()
        const params = {
            id:request.all().person
        }
        return await this.friendslist({params,view})
    }


    //Add friend
    async addFriend({request, view}){
        const person_friend = new PersonFriend()
        person_friend.user_id=request.all().id
        person_friend.following=request.all().following
        await person_friend.save()
        const params = {
            id:request.all().id
        }
        return await this.friends({params,view})
    }
}

module.exports = PersonFriendController
