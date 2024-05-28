const Department = require('../models/Department');

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }
    res.json(department);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Create a new department
exports.createDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const newDepartment = new Department({
      name
    });

    const department = await newDepartment.save();
    res.json(department);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update a department
exports.updateDepartment = async (req, res) => {
  const { name } = req.body;

  // Build department object
  const departmentFields = {};
  if (name) departmentFields.name = name;

  try {
    let department = await Department.findById(req.params.id);

    if (!department) return res.status(404).json({ msg: 'Department not found' });

    department = await Department.findByIdAndUpdate(
      req.params.id,
      { $set: departmentFields },
      { new: true }
    );

    res.json(department);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) return res.status(404).json({ msg: 'Department not found' });

    await Department.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Department removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
