// require express
const express = require('express');
// create router
const router = express.Router();
// Require Model
const Task = require('../models/Task.model');

// Defining Routes
router.get('/',async (req,res) =>
{
    try
    {
        let tasks = await Task.find();
        res.status(200).send(tasks)
    } catch (error)
    {
        console.log("Error Occured While Fetching Tasks");
        res.status(500).send("Error Occured While Fetching Tasks")

    }
});
router.post('/',async (req,res) =>
{
    try
    {
        let task = new Task(req.body);
        await task.save();
        res.status(200).send(task);
    } catch (error)
    {
        console.log("Error Occured While Creating Task");
        res.status(500).send("Error Occured While Creating Task")
    }
});
// delete task
router.delete('/:id',async (req,res) =>
{
    try
    {
        let task = await Task.findByIdAndDelete(req.params.id);
        res.status(200).send(task);
    }
    catch (error)
    {
        console.log("Error Occured While Deleting Task");
        res.status(500).send("Error Occured While Deleting Task")
    }
});


// export
module.exports = router;