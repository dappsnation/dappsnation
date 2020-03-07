module.exports = {
  name: 'material-form-factory',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/material-form-factory',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
