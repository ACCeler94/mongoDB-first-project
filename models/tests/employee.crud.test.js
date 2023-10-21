const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {
  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '6527dae09c48883bebe145c2' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: '6527dae09c48883bebe145c2' });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: '6527dae09c48883bebe145c2' });
      expect(employee.firstName).to.be.equal('John');
      expect(employee.lastName).to.be.equal('Doe');
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'John', lastName: 'Doe', department: '6527dae09c48883bebe145c2' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
    after(async () => {
      await Employee.deleteMany();
    });
  });
  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '6527dae09c48883bebe145c2' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: '6527dae09c48883bebe145c2' });
      await testEmpTwo.save();
    });
    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John', lastName: 'Doe' }, { $set: { firstName: 'Johny', lastName: 'Dom' } });
      const updatedEmployee = await Employee.findOne({ firstName: 'Johny', lastName: 'Dom' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe' });
      employee.firstName = 'Johny';
      employee.lastName = 'Dom'
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: 'Johny', lastName: 'Dom' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
      const employees = await Employee.find({ firstName: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    });

  });
  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '6527dae09c48883bebe145c2' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Smith', department: '6527dae09c48883bebe145c2' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John', lastName: 'Doe' });
      const removeEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Doe' });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany({});
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0)
    });
  });
});