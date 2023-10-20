const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should throw an error if no name arg is given', async () => {
    const dep = new Department({});

    dep.validateSync(err => {
      expect(err.errors.name).to.exist;
    });
  })
  it('should throw an error if "name" is not a string', async () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should throw an error if name has invalid length', async () => {
    const cases = ['HR', 'DepartmentNameLongerThanTwenty'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync(err => {
        expect(err.errors.name).to.exist
      })
    }
  });
  it('should not throw an error if valid arguments were provided', () => {
    const cases = ['Testing', 'AlittleLongerDepName'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync(err => {
        expect(err.errors.name).to.not.exist
      })
    }
  })

  after(() => {
    mongoose.models = {};
  });
})