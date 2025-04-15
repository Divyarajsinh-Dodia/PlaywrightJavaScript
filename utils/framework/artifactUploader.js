const fs = require('fs');
const path = require('path');

/**
 * Collects artifact files from given directories for CI upload.
 * @param {Array<string>} dirs - Directories to collect artifacts from
 * @param {Array<string>} [extensions] - File extensions to include (e.g., ['.log', '.png'])
 * @returns {Array<string>} - List of artifact file paths
 */
function collectArtifacts(dirs, extensions = ['.log', '.png', '.json', '.zip', '.mp4']) {
  let files = [];
  for (const dir of dirs) {
    const absDir = path.resolve(dir);
    if (!fs.existsSync(absDir)) continue;
    fs.readdirSync(absDir).forEach(file => {
      const abs = path.join(absDir, file);
      if (fs.statSync(abs).isFile() && extensions.some(ext => file.endsWith(ext))) {
        files.push(abs);
      }
    });
  }
  return files;
}

/**
 * Prints artifact paths for CI/CD systems to pick up (or use a CI API to upload).
 * @param {Array<string>} artifactPaths
 */
function printArtifactsForCI(artifactPaths) {
  artifactPaths.forEach(p => console.log(`[ARTIFACT] ${p}`));
}

module.exports = { collectArtifacts, printArtifactsForCI };