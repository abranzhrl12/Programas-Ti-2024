import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['> 0.20%, not dead', 'last 2 versions']
    }),
    cssnano({
      preset: 'default',
    }),
  ],
};
