const _ = require("lodash");

const { UserList, MovieList } = require("../FakeData")

const resolvers = {
    Query: {
        // users: () => {
        //     return UserList
        // },

        users: (parents, args, context, info) => {
            if(UserList) return {users: UserList}

            return {message: "Error: there was an error querying your data"}
        },


        user: (_, args) => {
            const id = args.id
            return UserList.find((user) => user.id == id)
        },
        // user: (parent, args ) => {
        //     const id = args.id
        //     const user = _.find(UserList, {id: Number(id)});
        //     return user
        // }
        movies: () => {
            return MovieList
        },
        movie: (_, args) => {
            const name = args.name
            return MovieList.find((movie) => movie.name == name)
        },

    },
    User: {
        favoritesMovies: () => {
            return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010)
        }
    },
    Mutation: {
        // createUser: (parent, args) => {
        //     const user = args.input
        //     const newUserId = UserList.length + 1
        //     user.id = newUserId
        //     console.log(user);
        //     UserList.push(user)
        //     return user
        // }
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },
        // updateUser: (parent, args) => {
        //     const {id, newUsername} = args.input;
        //     let updatedUserItem;
        //     UserList.forEach((user) => {
        //         if(user.id == Number(id)){
        //             user.username = newUsername
        //             updatedUserItem = user
        //         }
        //     })
        //     return updatedUserItem;
        // },
        updateUsername: (parent, args) => {
            const { id, newUsername } = args.input;
            let userUpdated;
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newUsername;
                    userUpdated = user;
                }
            });

            return userUpdated;
        },

        deleteUser: (parent, args) => {
            const id = args.id;
            _.remove(UserList, (user) => user.id === Number(id));
            return null;
        },
    },
    UsersResult : {
        __resolveType(obj){
            if(obj.users){
                return "UserSuccessfulResult"
            }
            if(obj.message){
                return "UserErrorResult"
            }
            return null
        }
    }
}

module.exports = { resolvers }