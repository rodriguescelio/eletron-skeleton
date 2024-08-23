import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { mainConfig } from './config/webpack.main.config';
import { rendererConfig } from './config/webpack.renderer.config';

const config: ForgeConfig = {
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupExe: 'setup.exe',
      skipUpdateIcon: true,
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: 'connect-src \'self\' * \'unsafe-eval\'',
      loggerPort: 9111,
      port: 3030,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/react/index.tsx',
            name: 'main_window',
            preload: {
              js: './src/electron/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
