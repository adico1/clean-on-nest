module.exports = {
  name: 'bootcamp-ui',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/bootcamp-ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
