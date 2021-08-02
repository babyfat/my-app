class ProjectRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT,code Text,name Text,project_tendering_date Text,information Text,budget Real,party_name Text,party_contact_name Text,party_contact_tel Text,manager Text,remarks Text, income Real)`
        return this.dao.run(sql)
    }

    insert(project) {
        const {
            code,
            name,
            project_tendering_date,
            information,
            budget,
            party_name,
            party_contact_name,
            party_contact_tel,
            manager,
            remarks,
            income
        } = project
        return this.dao.run(
            'INSERT INTO projects (code,name,project_tendering_date,information,budget,party_name,party_contact_name,party_contact_tel,manager,remarks,income) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)',
            [code,name,project_tendering_date,information,budget,party_name,party_contact_name,party_contact_tel,manager,remarks,income])
    }

    update(project) {
        const {
            id,
            code,
            name,
            project_tendering_date,
            information,
            budget,
            party_name,
            party_contact_name,
            party_contact_tel,
            manager,
            remarks,
            income
        } = project
        return this.dao.run(
            `UPDATE projects SET code = ?, name = ?, project_tendering_date = ?, information = ?, budget = ?, party_name = ?, party_contact_name = ?, party_contact_tel = ?, manager = ?, remarks = ?, income = ? WHERE id = ?`,
            [code,name,project_tendering_date,information,budget,party_name,party_contact_name,party_contact_tel,manager,remarks, income, id]
        )
    }

    delete(id) {
        return this.dao.run(
            `DELETE FROM projects WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM projects WHERE id = ?`,
            [id])
    }

    getAll(projectQuery) {
        let sql = 'SELECT * FROM projects WHERE 1 = 1 '

        if (projectQuery.project_tendering_date != null) {
            sql = sql +  " AND project_tendering_date LIKE '" +  projectQuery.project_tendering_date + "%'"
        } 
        if (projectQuery.name != null){
            sql = sql +  " AND name LIKE '%" +  projectQuery.name + "%'"
        } 
        sql = sql + ' ORDER BY id DESC '
        console.log(sql)
        return this.dao.all(sql)
    }

}
module.exports = ProjectRepository