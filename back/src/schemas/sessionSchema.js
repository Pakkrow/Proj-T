const mysql = require('mysql2/promise');
const { v4: UUID } = require('uuid');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "users"
});

class SessionSchema {
    /**
     * Create a new session
     * @param userId string
     * @returns created session
     */
    async create(userId) {
        const createdAt = new Date();
        const token = UUID();

        const [result] = await pool.query(
            'INSERT INTO session (user_id, token, created_at) VALUES (?, ?, ?)',
            [userId, token, createdAt]
        );
        return { id: result.insertId, user_id: userId, token, created_at: createdAt };
    }

    /**
     * Get a session by token
     * @param token string
     * @returns session or null
     */
    async getByToken(token) {
        const [rows] = await pool.query(
            'SELECT * FROM session WHERE token = ?',
            [token]
        );
        return rows.length ? rows[0] : null;
    }

    /**
     * Get a session by user id
     * @param userId string
     * @returns session or null
     */
    async getByUserId(userId) {
        const [rows] = await pool.query(
            'SELECT * FROM session WHERE user_id = ?',
            [userId]
        );
        return rows.length ? rows[0] : null;
    }

    /**
     * Delete session by token
     * @param token string
     * @returns void
     */
    async deleteByToken(token) {
        await pool.query(
            'DELETE FROM session WHERE token = ?',
            [token]
        );
    }

    /**
     * Delete session by user id
     * @param userId string
     * @returns void
     */
    async deleteByUserId(userId) {
        await pool.query(
            'DELETE FROM session WHERE user_id = ?',
            [userId]
        );
    }
}

module.exports = SessionSchema;
