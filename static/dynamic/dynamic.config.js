self.__dynamic$config = {
  prefix: '/dyn/',
  encoding: 'xor',
  mode: 'production', 
  logLevel: 3, 
  bare: {
    version: 3, 
    path: '/bare/',
  },
  tab: {
    title: 'Service',
    icon: null,
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Terbium Browser v1.43',
  },
  assets: {
    prefix: '/dynamic/',
    files: {
      handler: 'dynamic.handler.js',
      client: 'dynamic.client.js',
      worker: 'dynamic.worker.js',
      config: 'dynamic.config.js',
      inject: null,
    }
  },
  block: [
  
  ]
};
