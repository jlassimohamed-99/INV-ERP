const express = require('express');
const { getCompanies, getCompany, createCompany, updateCompany, deleteCompany } = require('../controllers/companyController');
const router = express.Router();

router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router;
