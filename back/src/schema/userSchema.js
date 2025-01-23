const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "users"
});

class UserSchema {
    /**
     * Create a new user
     * @param data User
     * @returns created user
     */
    async create(data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const [result] = await pool.query(
            'INSERT INTO user_info (login, password, email) VALUES (?, ?, ?)',
            [data.login, data.password, data.email]
        );
        return { id: result.insertId, ...data };
    }

    /**
     * Edit one user
     * @param data User
     * @returns updated user
     */
    async edit(data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const [result] = await pool.query(
            'UPDATE user_info SET login = ?, password = ?, email = ? WHERE login = ?',
            [data.login, data.password, data.email, data.login]
        );
        return result.affectedRows ? data : null;
    }

    /**
     * Delete one user
     * @param criteria User
     * @returns deleted user
     */
    async delete(criteria) {
        const [result] = await pool.query(
            'DELETE FROM user_info WHERE login = ?',
            [criteria.login]
        );
        return result.affectedRows ? criteria : null;
    }

    /**
     * Get one user by login
     * @param login
     * @returns user
     */
    async getByUsername(login) {
        const [rows] = await pool.query(
            'SELECT * FROM user_info WHERE login = ?',
            [login]
        );
        return rows.length ? rows[0] : null;
    }

    /**
     * Get one user by id
     * @param id
     * @returns user
     */
    async getById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM user_info WHERE id = ?',
            [id]
        );
        return rows.length ? rows[0] : null;
    }

    /**
     * Get a list of users
     * @param size number of users
     * @param indexStart index of the first user of the list (pagination)
     * @returns user list
     */
    async getAll(size, indexStart = 0) {
        const [rows] = await pool.query(
            'SELECT * FROM user_info LIMIT ?, ?',
            [indexStart, size]
        );
        return rows;
    }

    /**
     * Search users
     * @param size
     * @param offset
     * @param searchCriteria
     * @returns Users list
     */
    async search(size, offset, searchCriteria) {
        const { login, email } = searchCriteria;
        const [rows] = await pool.query(
            'SELECT * FROM user_info WHERE login LIKE ? OR email LIKE ? LIMIT ?, ?',
            [`%${login}%`, `%${email}%`, offset, size]
        );
        return rows;
    }

    /**
     * Truncate the table
     * @returns result of delete
     */
    async clearTable() {
        const [result] = await pool.query('DELETE FROM user_info');
        return result;
    }

    /**
     * Count Elements in the table
     * @returns number of elements
     */
    async count(whereCriteria = {}) {
        const [rows] = await pool.query(
            'SELECT COUNT(*) AS count FROM user_info WHERE login LIKE ? OR email LIKE ?',
            [`%${whereCriteria.login || ''}%`, `%${whereCriteria.email || ''}%`]
        );
        return rows[0].count;
    }

    /**
     * Add reset password token
     * @param id
     * @param token
     * @returns updated user
     */
    async addResetPasswordToken(id, token) {
        const [result] = await pool.query(
            'UPDATE user_info SET reset_token = ? WHERE id = ?',
            [token, id]
        );
        return result.affectedRows ? await this.getById(id) : null;
    }

    /**
     * Get user by reset password token
     * @param token
     * @returns user
     */
    async getByResetPasswordToken(token) {
        const [rows] = await pool.query(
            'SELECT * FROM user_info WHERE reset_token = ?',
            [token]
        );
        return rows.length ? rows[0] : null;
    }
}

module.exports = UserSchema;