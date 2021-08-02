class SalaryRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS salarys (id INTEGER PRIMARY KEY AUTOINCREMENT,uid Integer,name Text,p_salary Real,job_subsidy Real,seniority Real,performance Real,total_gross_pay Real,person_insurance Real,company_insurance Real,deduct_money Real,personal_income_tax Real,actual_salary Real,salary_date Text,recipient Text,remarks Text)`
        return this.dao.run(sql)
    }

    insert(salary) {
        const {
            uid,
            name,
            p_salary,
            job_subsidy,
            seniority,
            performance,
            total_gross_pay,
            person_insurance,
            company_insurance,
            deduct_money,
            personal_income_tax,
            actual_salary,
            salary_date,
            recipient,
            remarks
        } = salary
        return this.dao.run(
            'INSERT INTO salarys (uid,name,p_salary,job_subsidy,seniority,performance,total_gross_pay,person_insurance,company_insurance,deduct_money,personal_income_tax,actual_salary,salary_date,recipient,remarks) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [uid,name,p_salary,job_subsidy,seniority,performance,total_gross_pay,person_insurance,company_insurance,deduct_money,personal_income_tax,actual_salary,salary_date,recipient,remarks])
    }

    update(salary) {
        const {
            id,
            uid,
            name,
            p_salary,
            job_subsidy,
            seniority,
            performance,
            total_gross_pay,
            person_insurance,
            company_insurance,
            deduct_money,
            personal_income_tax,
            actual_salary,
            salary_date,
            recipient,
            remarks
        } = salary
        return this.dao.run(
            `UPDATE salarys SET uid = ? ,name = ? ,p_salary = ? ,job_subsidy = ? ,seniority = ? ,performance = ? ,total_gross_pay = ? ,person_insurance = ? ,company_insurance = ? ,deduct_money = ? ,personal_income_tax = ? ,actual_salary = ? ,salary_date = ? ,recipient = ? ,remarks = ? WHERE id = ?`,
            [uid,name,p_salary,job_subsidy,seniority,performance,total_gross_pay,person_insurance,company_insurance,deduct_money,personal_income_tax,actual_salary,salary_date,recipient,remarks, id]
        )
    }

    delete(id) {
        return this.dao.run(
            `DELETE FROM salarys WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM salarys WHERE id = ?`,
            [id])
    }

    getAll(salaryQuery) {
        let sql = 'SELECT * FROM salarys WHERE 1 = 1 '
     
        if (salaryQuery.salary_date != null) {
            sql = sql +  " AND salary_date LIKE '" +  salaryQuery.salary_date + "%'"
        } 
        if (salaryQuery.name != null){
            sql = sql +  " AND name LIKE '%" +  salaryQuery.name + "%'"
        } 
        sql = sql + ' ORDER BY id DESC, salary_date DESC '
        console.log(sql)
        return this.dao.all(sql)
    }

}
module.exports = SalaryRepository