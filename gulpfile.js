const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const replace = require('gulp-replace');

gulp.task('ng-bump-version', function() {
  const ng_env = argv['configuration'];
  const env_dir_path = path.resolve(__dirname, `./src/environments`);
  const env_file_path = path.join(env_dir_path, `environment.${ng_env}.ts`);
  return gulp
    .src([env_file_path])
    .pipe(
      replace(/version:\s?"\d+.\d+.\d+.\d+",?/g, function(match) {
        const matches = /(version:\s?")(\d+.\d+.\d+.\d+)(",?)/g.exec(match);
        const version_string = matches[2];
        const version_parts = version_string.split('.').map(v => +v);
        version_parts[version_parts.length - 1]++;
        const new_version_string = version_parts.join('.');
        const replaced_version_string = match.replace(
          version_string,
          new_version_string,
        );
        console.log(
          `${this.file.path} New version to be written: ${replaced_version_string}`,
        );
        return replaced_version_string;
      }),
    )
    .pipe(gulp.dest(env_dir_path));
});
