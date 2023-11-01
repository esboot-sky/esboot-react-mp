import VConsole from 'vconsole';

const enable = true;

if (enable && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vConsole = new VConsole();
}
