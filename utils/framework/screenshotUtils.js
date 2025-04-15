/**
 * screenshotUtils.js
 *
 * Utility functions for managing screenshots, videos, and trace files in Playwright tests.
 * - Screenshots are saved in screenshots/<runFolder>/<testName>.png
 * - Videos are saved in videos/<runFolder>/<testName>.webm
 * - Traces are saved in trace/<runFolder>/<testName>.zip
 * Each <runFolder> is named based on the system date and time at the start of the test run.
 */

const fs = require('fs');
const path = require('path');

// Get or create the screenshots root folder
function getScreenshotsRoot() {
  const root = path.resolve('screenshots');
  if (!fs.existsSync(root)) fs.mkdirSync(root);
  return root;
}

// Get or create the run folder based on date and time
function getRunFolder() {
  const now = new Date();
  const folderName = now.toISOString().replace(/:/g, '-').replace(/\..+/, '').replace('T', '_');
  const runFolder = path.join(getScreenshotsRoot(), folderName);
  if (!fs.existsSync(runFolder)) fs.mkdirSync(runFolder);
  return runFolder;
}

// Store the run folder for this test run
let runFolder = null;
function getOrCreateRunFolder() {
  if (!runFolder) runFolder = getRunFolder();
  return runFolder;
}

/**
 * Take a screenshot and save it in the screenshots/<runFolder>/ directory with the test name.
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} testName - Name of the test (used for screenshot filename)
 * @returns {Promise<string>} - Path to the saved screenshot
 */
async function takeScreenshot(page, testName) {
  const folder = getOrCreateRunFolder();
  const fileName = `${testName.replace(/[^a-zA-Z0-9-_]/g, '_')}.png`;
  const filePath = path.join(folder, fileName);
  await page.screenshot({ path: filePath });
  return filePath;
}

// Get or create the videos root folder
function getVideosRoot() {
  const root = path.resolve('videos');
  if (!fs.existsSync(root)) fs.mkdirSync(root);
  return root;
}

// Get or create the run folder for videos based on date and time
function getVideoRunFolder() {
  const now = new Date();
  const folderName = now.toISOString().replace(/:/g, '-').replace(/\..+/, '').replace('T', '_');
  const runFolder = path.join(getVideosRoot(), folderName);
  if (!fs.existsSync(runFolder)) fs.mkdirSync(runFolder);
  return runFolder;
}

let videoRunFolder = null;
function getOrCreateVideoRunFolder() {
  if (!videoRunFolder) videoRunFolder = getVideoRunFolder();
  return videoRunFolder;
}

/**
 * Move the test video to the videos/<runFolder>/ directory with the test name.
 * @param {object} testInfo - Playwright testInfo object
 * @returns {Promise<string|null>} - Path to the saved video or null if not found
 */
async function saveVideo(testInfo) {
  if (!testInfo || !testInfo.attachments) return null;
  const videoAttachment = testInfo.attachments.find(a => a.name === 'video' && a.path);
  if (!videoAttachment) return null;
  const folder = getOrCreateVideoRunFolder();
  const fileName = `${testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_')}.webm`;
  const destPath = path.join(folder, fileName);
  fs.copyFileSync(videoAttachment.path, destPath);
  // Optionally, delete the original video file
  // fs.unlinkSync(videoAttachment.path);
  return destPath;
}

// Get or create the traces root folder
function getTracesRoot() {
  const root = path.resolve('trace');
  if (!fs.existsSync(root)) fs.mkdirSync(root);
  return root;
}

// Get or create the run folder for traces based on date and time
function getTraceRunFolder() {
  const now = new Date();
  const folderName = now.toISOString().replace(/:/g, '-').replace(/\..+/, '').replace('T', '_');
  const runFolder = path.join(getTracesRoot(), folderName);
  if (!fs.existsSync(runFolder)) fs.mkdirSync(runFolder);
  return runFolder;
}

let traceRunFolder = null;
function getOrCreateTraceRunFolder() {
  if (!traceRunFolder) traceRunFolder = getTraceRunFolder();
  return traceRunFolder;
}

/**
 * Move the test trace to the trace/<runFolder>/ directory with the test name.
 * @param {object} testInfo - Playwright testInfo object
 * @returns {Promise<string|null>} - Path to the saved trace or null if not found
 */
async function saveTrace(testInfo) {
  if (!testInfo || !testInfo.attachments) return null;
  const traceAttachment = testInfo.attachments.find(a => a.name === 'trace' && a.path);
  if (!traceAttachment) return null;
  const folder = getOrCreateTraceRunFolder();
  const fileName = `${testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_')}.zip`;
  const destPath = path.join(folder, fileName);
  fs.copyFileSync(traceAttachment.path, destPath);
  // Optionally, delete the original trace file
  // fs.unlinkSync(traceAttachment.path);
  return destPath;
}

module.exports = { takeScreenshot, saveVideo, saveTrace };
