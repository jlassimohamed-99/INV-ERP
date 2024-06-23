const Conge = require('../models/congeModel');
const User = require('../models/userModel'); // Ensure you have the User model imported

exports.getAllConges = async (req, res) => {
  try {
    const conges = await Conge.find({}).populate('employeeId', 'name'); // Populate the employeeId field with the name field from the User model
    res.status(200).json(conges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createConge = async (req, res) => {
  const conge = new Conge({
    ...req.body,
    employeeName: req.user.name,
    employeeId: req.user.id
  });

  try {
    const newConge = await conge.save();
    res.status(201).json(newConge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCongeStatus = async (req, res) => {
  try {
    const conge = await Conge.findById(req.params.id);
    if (!conge) {
      return res.status(404).json({ message: 'Conge not found' });
    }
    conge.status = req.body.status;
    const updatedConge = await conge.save();
    res.status(200).json(updatedConge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
