class AnalysisRepository {
    constructor(dao) {
        this.dao = dao
    }

    // 每月人员支出合计 = 应发合计-其他扣款
    getSalarySum(month) {
        let sql = "SELECT (round(sum(total_gross_pay),2) - round(sum(deduct_money),2)) totalPersonSalary FROM salarys WHERE salary_date LIKE '" + month + "%'"
        return this.dao.get(sql)
    }

    // 每月公司社保支出合计
    getCompanyInsuranceSum(month) {
        let sql = "SELECT (round(sum(company_insurance),2)) totalCompanyInsurance FROM salarys WHERE salary_date LIKE '" + month + "%'"
        return this.dao.get(sql)
    }

    // 固定资产合计
    getFixedAssetsSum(month){
        let sql = "SELECT round(sum(amount),2) totalFixedFixedAmounts FROM assets WHERE type = '0' AND buy_time LIKE '" + month + "%'"
        return this.dao.get(sql)
    }

    // 易耗品合计
    getDailyAssetsSum(month){
        let sql = "SELECT round(sum(amount),2) totalDailyDailyAmounts FROM assets WHERE type = '1' AND buy_time LIKE '" + month + "%'"
        return this.dao.get(sql)
    }

}
module.exports = AnalysisRepository