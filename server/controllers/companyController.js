const Company = require('../models/companyModel');

const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ isDeleted: false });
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createCompany = async (req, res) => {
    const { name, social_reason, activity, next_payment_date, fiscal_calendar, address, phone, category } = req.body;
    try {
        const newCompany = new Company({
            company_id: new mongoose.Types.ObjectId().toString(),
            name,
            social_reason,
            activity,
            next_payment_date,
            fiscal_calendar,
            address,
            phone,
            category
        });

        await newCompany.save();
        res.status(201).json({ message: 'Company created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getCompanies, getCompany, createCompany, updateCompany, deleteCompany };
