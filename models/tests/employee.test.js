const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employee = require('../employee.model');

describe('Employee', () => {
  it('should throw an error if any argument is missing', async () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe' },
      { lastName: 'Doe', department: '6527dae09c48883bebe145c2' },
      { firstName: 'John', department: '6527dae09c48883bebe145c2' },
      {}
    ]

    for (let caseObj of cases) {
      const emp = new Employee(caseObj);

      emp.validateSync(err => {
        expect(err.error.name).to.exist
      })
    }
  });
  it('should throw an error if any of the arguments is not a string', async () => {
    const cases = [
      { firstName: [], lastName: 'Doe', department: '6527dae09c48883bebe145c2' },
      { firstName: 'John', lastName: [], department: '6527dae09c48883bebe145c2' },
      { firstName: 'John', lastName: 'Doe', department: [] },
      {}
    ]

    for (let caseObj of cases) {
      const emp = new Employee(caseObj);

      emp.validateSync(err => {
        expect(err.error.name).to.exist
      })
    }
  });
  it('should not throw an error if valid arguments were passed', () => {
    const emp = new Employee({ firstName: 'John', lastName: 'Doe', department: '6527dae09c48883bebe145c2' });

    emp.validateSync(err => {
      expect(err.name).to.not.exist
    })
  })

  after(() => {
    mongoose.models = {};
  });
})