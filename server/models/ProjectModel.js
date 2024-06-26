  const mongoose = require('mongoose');
  const { v4: uuidv4 } = require('uuid');

  const projectSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['To Do', 'In Progress', 'Done'],
    },
    responsable: {
      type: String,
      ref: 'User',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  }, {
    timestamps: true,
  });

  const Project = mongoose.model('Project', projectSchema);

  module.exports = Project;
