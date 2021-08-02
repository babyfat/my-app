class AssetsRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS assets (id Integer PRIMARY KEY AUTOINCREMENT,code Text,name Text,type Text,category Text,specifications Text,num Integer,units Text,price Real,amount Real,buy_time Text,store_address Text,picture Blob,remarks Text)`
        return this.dao.run(sql)
    }

    insert(assets) {
        const {
            code,
            name,
            type,
            category,
            specifications,
            num,
            units,
            price,
            amount,
            buy_time,
            store_address,
            picture,
            remarks
        } = assets
        return this.dao.run(
            'INSERT INTO assets (code,name,type,category,specifications,num,units,price,amount,buy_time,store_address,picture,remarks) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [code,name,type,category,specifications,num,units,price,amount,buy_time,store_address,picture,remarks])
    }

    update(assets) {
        const {
            id,
            code,
            name,
            type,
            category,
            specifications,
            num,
            units,
            price,
            amount,
            buy_time,
            store_address,
            remarks
        } = assets
        return this.dao.run(
            `UPDATE assets SET code = ? , name = ? , type = ? , category = ? , specifications = ? , num  = ? , units = ? , price = ? , amount = ? , buy_time = ? , store_address  = ? , remarks  = ? WHERE id = ?`,
            [code,name,type,category,specifications,num,units,price,amount,buy_time,store_address,remarks,id]
        )
    }

    delete(id) {
        return this.dao.run(
            `DELETE FROM assets WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM assets WHERE id = ?`,
            [id])
    }

    getAll(assetsQuery) {
        let sql = 'SELECT * FROM assets WHERE type = ' + assetsQuery.type
     
        if (assetsQuery.begin_time != null) {
            sql = sql +  " AND buy_time >= '" +  assetsQuery.begin_time + "'"
        } 
        if (assetsQuery.end_time != null){
            sql = sql +  " AND buy_time <= '" +  assetsQuery.end_time + "'"
        } 
        sql = sql + ' ORDER BY buy_time DESC '
        console.log(sql)
        return this.dao.all(sql)
    }

    getAssetsSum(assetsQuery) {
        let sql = 'SELECT round(sum(amount),2) amounts FROM assets WHERE type = ' + assetsQuery.type
        if (assetsQuery.begin_time != null) {
            sql = sql +  " AND buy_time >= '" +  assetsQuery.begin_time + "'"
        } 
        if (assetsQuery.end_time != null){
            sql = sql +  " AND buy_time <= '" +  assetsQuery.end_time + "'"
        } 
        console.log(sql)
        return this.dao.get(sql)
    }

}
module.exports = AssetsRepository