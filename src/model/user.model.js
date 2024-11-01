import dataBase from '../db/database.js';
let connection = new dataBase()

export default class userModel {
    #id;
    #name;
    #email;
    #age;

    constructor(id, name, email, age) {
        this.#id = id;
        this.#name = name;
        this.#email = email;
        this.#age = age;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get email() { return this.#email; }
    get age() { return this.#age; }

    set id(id) { this.#id = id; }
    set name(name) { this.#name = name; }
    set email(email) { this.#email = email; }
    set age(age) { this.#age = age; }

    async create() {
        const sql = "INSERT INTO tb_users(us_name,us_email,us_age) VALUES (?,?,?)";
        const vals = [this.#name, this.#email, this.#age];

        return await connection.ExecutaComandoNonQuery(sql, vals);
    }

    async list() {
        const sql = "SELECT * FROM tb_users";

        return await connection.ExecutaComando(sql);
    }

    async search() {
        const sql = "SELECT * FROM tb_users WHERE us_id = ?";
        const val = [this.#id];

        return await connection.ExecutaComando(sql, val);
    }

    async delete() {
        const sql = "DELETE FROM tb_users WHERE us_id = ?";
        const val = [this.#id];

        return await connection.ExecutaComandoNonQuery(sql, val);
    }

    async update() {
        const sql = "UPDATE tb_users SET us_name = ?, us_email = ?, us_age = ? WHERE us_id = ?";
        const vals = [this.#name, this.#email, this.#age, this.#id]

        return await connection.ExecutaComandoNonQuery(sql,vals);
    }
}