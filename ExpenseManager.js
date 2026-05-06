class ExpenseManager{
    constructor(){
        this.expenses = [];
        this.nextId = 1;
    }
    addExpense(title, amount, category, isReccuring, date){
        const expense = new Expense(this.nextId, 
        title, 
        amount,
        category,
        isReccuring,
        date);
        this.expenses.push(expense);
        this.nextId++;
    }
    getAllExpenses(){
        return this.expenses;
    }
    deleteExpense(id){
        this.expenses = this.expenses.filter(expense => expense.id !== id);
    }
    searchExpenses(query){
        const Query = query.toLowerCase();
        return this.expenses.filter(expense => 
            expense.title.toLowerCase().includes(Query) ||
            expense.category.toLowerCase().includes(Query)
        );
    }
}