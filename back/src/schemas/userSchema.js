const users = [];

const UserSchema = {
    async getByUsername(username) {
        return users.find((user) => user.username === username);
    },

    async create(user) {
        user.id = users.length + 1;
        users.push(user);
        return user;
    },
};

export default UserSchema;