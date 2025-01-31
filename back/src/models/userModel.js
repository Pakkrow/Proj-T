export const UserRole = Object.freeze({
    USER: "USER",
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",
});


export class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        if (typeof user.role === "string") {
            this.role = UserRole[user.role];
        } else {
            this.role = user.role;
        }
        this.reset_token = user.reset_token ? user.reset_token : null;
    }
}