import { MANIFEST_JSON_PATH } from '../app.config';
import packageJson from '../../package.json';

/**
 * Check if Semver version of first version is grater than second
 * @param {string} versionA - Semver version A
 * @param {string} versionB - Semver version B
 * @return {boolean} - True is versionA is greater than versionB
 */
export const checkSemverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA.split(/\./g);

  const versionsB = versionB.split(/\./g);
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};

export const refreshCacheAndReload = () => {
  console.log('Clearing cache and hard reloading...');
  if (caches) {
    // Service worker cache should be cleared with caches.delete()
    caches.keys().then(function (names) {
      for (let name of names) caches.delete(name);
    });
  }

  // delete browser cache and hard reload
  window.location.reload(true);
};

export const cacheBusting = () => {
  fetch(MANIFEST_JSON_PATH + `?${packageJson.version}`)
    .then((response) => response.json())
    .then((meta) => {
      const latestVersion = meta.version;
      const currentVersion = packageJson.version;

      const shouldForceRefresh = checkSemverGreaterThan(latestVersion, currentVersion);
      if (shouldForceRefresh) {
        console.log(`We have a new version - ${latestVersion}. Should force refresh`);
        refreshCacheAndReload();
      } else {
        console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
      }
    });
};
