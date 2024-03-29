const express = require('express');
const mongoose=require('mongoose');
const app=express();
const port=3000;
const Expense=require('./expense');
mongoose.connect('mongodb+srv://bhuvaneshwaric:bhuvana3003@cluster0.brn5wsq.mongodb.net/newDB?retryWrites=true&w=majority',{
     useUnifiedTopology: true
});
app.use(express.json());
app.get('/expenses',async(req,res)=>{

    const expenses=await Expense.find();

    res.send(expenses);
    
})

app.get('/expenses',async(req,res)=>{
    console.log(req.params);
    
    // const expenses=await Expense.find();

    // res.send(expenses);
    
})
app.get('/expense/:id',async(req,res)=>{
    try{
        // const id=req.params.id;
        const result=await Expense.findById(id);
        if(result)
              res.send(result);
        else
              res.send("No Expense with that id");
    }catch(err){
        res.send(err);
    }
});
app.delete('/expensedel/:id',async(req,res)=>{
    try{
        // const id=req.params.id;
        const result=await Expense.findByIdAndDelete(id);
        if(result)
              res.send(result);
        else
              res.send("No Expense with that id");
    }catch(err){
        res.send(err);
    }
});



app.post('/expenses',async(req,res)=>{
   console.log(req.body);
   const newExpense=req.body;
   await Expense.create(newExpense);
   res.send('Created');
})
app.put('/expenses/:id',async(req,res)=>{
    const id =req.params.id
    const updateObject =req.body
    const updated= await Expense.findByIdAndUpdate(id,{$set:updateObject},
        {
            new:true
        })
        res.send(updateObject)
    console.log(req.body);
    const newExpense=req.body;
    await Expense.create(newExpense);
    res.send('Created');
 })

app.listen(port,()=>{
    console.log(`Example app Listening on port ${port}`)
})