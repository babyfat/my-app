class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,loginId Text,name Text,passwd Text,tel Text,mail Text,status Text,entry_date Text,term_date Text ,salary Real,type Text, remarks Text)`
        return this.dao.run(sql)
    }

    insert(user) {
        const {
            loginId,
            name,
            passwd,
            tel,
            mail,
            status,
            entry_date,
            term_date,
            salary,
            type,
            remarks
        } = user
        return this.dao.run(
            'INSERT INTO users (loginId, name, passwd, tel, mail, status, entry_date, term_date, salary, type, remarks) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [loginId, name, passwd, tel, mail, status, entry_date, term_date, salary, type, remarks])
    }

    update(user) {
        const {
            id,
            loginId,
            name,
            passwd,
            tel,
            mail,
            status,
            entry_date,
            term_date,
            salary,
            type,
            remarks
        } = user
        return this.dao.run(
            `UPDATE users SET loginId = ?,name = ?,passwd = ?,tel = ?,mail = ?,status = ?,entry_date = ?,term_date = ?,salary = ?,type = ?,remarks = ? WHERE id = ?`,
            [loginId, name, passwd, tel, mail, status, entry_date, term_date, salary, type, remarks, id]
        )
    }

    delete(id) {
        return this.dao.run(
            `DELETE FROM users WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM users WHERE id = ?`,
            [id])
    }

    getAll() {
        return this.dao.all(`SELECT * FROM users`)
    }

    getAllByStatus(status) {
        return this.dao.all(`SELECT * FROM users WHERE status = ? `
        , [status])
    }

    getByKeyword(keyword) {
        let sql = "SELECT * FROM users WHERE loginId LIKE '%" + keyword + "%' or name LIKE '%" + keyword + "%'"
        console.log(sql)
        return this.dao.all(sql)
    }

    verifyLogin(loginId, passwd) {
        console.log(loginId, passwd);
        return this.dao.get(`SELECT * FROM users WHERE loginId = ? AND passwd =? `,
            [loginId, passwd])
    }
}
module.exports = UserRepository