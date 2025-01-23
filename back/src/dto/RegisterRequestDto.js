class RegisterRequestDto {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

module.exports = RegisterRequestDto;