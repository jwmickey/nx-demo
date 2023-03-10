import { defineConfig } from 'cypress';
import { nxComponentTestingPreset } from '@nrwl/angular/plugins/component-testing';
import { initPlugin } from "@frsource/cypress-plugin-visual-regression-diff/plugins";

export default defineConfig({
  component: {
    ...nxComponentTestingPreset(__filename),
    setupNodeEvents(on, config) {
      initPlugin(on, config);
    },
    experimentalWebKitSupport: true
  },
  env: {
    pluginVisualRegressionForceDeviceScaleFactor: false,
    pluginVisualRegressionUpdateImages: false,
    pluginVisualRegressionDiffConfig: { threshold: 0.1 },
  },
});