const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task_id: { type: String, required: true, unique: true },
    responsible: { type: String, required: true },
    due_date: { type: Date, required: true },
    client: { type: String, required: true },
    note: { type: String },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', taskSchema);
