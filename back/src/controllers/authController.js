import UserSchema from "../schemas/userSchema.js";

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = {username, password};

        if (!user || user.password !== "testpassword") {
            console.log("user.password == " + user.password)
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while logging in", error: error.message });
    }
}

export async function register(req, res) {
    const { username, password, confirmPassword, mail } = req.body;

    try {
        console.log("Datas : " + username + " // " + password + "// " + confirmPassword +  "// " + mail);
        res.status(201).json({ message: "User registered", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while registering", error: error.message });
    }
}