const express = require('express');
const employeeModel = require('../models/employee');
const userModel = require("../models/user");

const routes = express.Router();

// Helper function for error responses
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
};

// Get All Employees
routes.get("/employees", async (req, res) => {
    try {
        res.json(await employeeModel.find());
    } catch (error) {
        handleError(res, error);
    }
});

// Add NEW Employee
routes.post("/employees", async (req, res) => {
    try {
        const {email} = req.body;
        const existingEmployee = await employeeModel.findOne({ email });
        if (existingEmployee) {
            return res.status(409).json({ status: false, message: 'Email already registered' });
        }
        await new employeeModel(req.body).save();
        res.status(201).json({ status: true, message: 'Employee registered successfully' });
    } catch (error) {
        handleError(res, error);
    }
});

// Update existing Employee By Id
routes.put("/employees/:eid", async (req, res) => {
    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.json(updatedEmployee);
    } catch (error) {
        handleError(res, error);
    }
});

// Get Employee By _id
routes.get("/employees/:eid", async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.json({ status: true, data: employee });
    } catch (error) {
        handleError(res, error);
    }
});

// Delete Employee By Id
routes.delete("/employees/:eid", async (req, res) => {
    try {
        const deletedEmployee = await employeeModel.findByIdAndRemove(req.params.eid);
        if (!deletedEmployee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(204).send();
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = routes;