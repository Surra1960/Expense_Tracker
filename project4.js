

const expenseManager = new ExpenseManager();
const addExpenseBtn= document.getElementById('addExpense');
addExpenseBtn.addEventListener("click",storeData);
const displayExpensesBtn = document.getElementById('displayExpenses');
displayExpensesBtn.addEventListener("click",()=>displayData());
const searchInput = document.getElementById('search');
searchInput.addEventListener("keyup", (e)=>(e.key === "Enter" ? searchExpenses() : null));
 

function storeData(){
    const message = document.getElementById('message');
    const title = document.getElementById('title').value.toLowerCase().trim();
    if(title===""){
        message.textContent="Please enter a valid title.";
        message.style.color="red";
        message.style.fontSize="20px";
        message.style.fontWeight="bold";
        return;
    }
    const amount =Number(document.getElementById('amount').value);
     if(isNaN(amount) || amount <= 0){
        message.textContent="Please enter a valid positive number for the amount.";
        message.style.color="red";
        message.style.fontSize="20px";
        message.style.fontWeight="bold";
        return;
    }
    let isReccuring = document.getElementById('isReccuring').value.toLowerCase();
        if(isReccuring=="yes"){
            isReccuring=true;}
        else if(isReccuring=="no"){
            isReccuring=false;}
            else{
            message.textContent="Please enter yes or no for the recurring field.";
            message.style.color="red";
            message.style.fontSize="20px";
            message.style.fontWeight="bold";
                return;
            }
    const category = document.getElementById('category').value.toLowerCase();
    const date = document.getElementById('date').value;
    expenseManager.addExpense(title, amount, category, isReccuring, date);
    message.textContent="Expense added successfully!";
    message.style.color="green";
    message.style.fontSize="20px";
    message.style.fontWeight="bold";
}
function displayData(data){
    
    const expenseList = document.getElementById('expenseList');
    expenseList.textContent=""; 
    (data ? data :expenseManager.getAllExpenses()).forEach(expense=>{
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${expense.title}, Amount: ${expense.amount}, Category: ${expense.category}, Recurring: ${expense.isReccuring}, Date: ${expense.date}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            expenseManager.deleteExpense(expense.id);
            displayData();
        });
        listItem.appendChild(deleteBtn);
        expenseList.appendChild(listItem);
    });
}

function searchExpenses(){
    const query = document.getElementById('search').value;
    const results = expenseManager.searchExpenses(query);
    if(results.length === 0){
        const searchInfo=document.getElementById('searchInfo');
        searchInfo.textContent = "No expenses found matching your search.";
        searchInfo.style.color="red";
        searchInfo.style.fontSize="20px";
        searchInfo.style.fontWeight="bold";
        return;
    }
    const expenseList = document.getElementById('expenseList');
    expenseList.textContent="";
    displayData(results);
}