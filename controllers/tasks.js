const Task = require('../models/Task') 
const asyncWrapper = require('../middleware/asyncwrapper')
const { createCustomError } = require('../errors/error-class')


const GetAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
    //res.status(200).json({ status:'Success', data: { tasks,  amount: tasks.length } })
    res.status(200).json({ tasks })
})

const CreateTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task}) 
})

const GetTask = asyncWrapper(async (req, res, next) => {
    // const onetask = await Task.findById(req.params.id)
    // return only name field (optional)
    const onetask = await Task.findOne({_id: req.params.id}, 'name')

    // case of invalid id (syntaxically correct ID but not in db)
    if (!onetask) {
        return next(createCustomError(`No task with id: ${req.params.id}`, 404))
    }
    res.status(200).json({ onetask })  
})

const UpdateTask = asyncWrapper(async (req, res) => {
    // or directly use req.params.id and req.body
    const {id: taskID} = req.params
    const data = req.body
    const task = await Task.findOneAndUpdate({_id: taskID}, data, {
        new: true,// return the updated task
        runValidators: true
    })
    if (!task) {
        return res.status(404).json({ msg: `No task with id : ${req.params.id}` })
    }
    res.status(200).json({ task })
})

const DeleteTask = asyncWrapper(async (req, res) => {
    // const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOneAndDelete({_id: req.params.id})
    if (!task) {
        return res.status(404).json({ msg: `No task with id : ${req.params.id}` })
    }
    res.status(200).json({ 'deleted':task })
})

module.exports = {
    GetAllTasks,
    CreateTask,
    GetTask,
    UpdateTask,
    DeleteTask
}