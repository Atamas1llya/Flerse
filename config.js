const config = {

  production: {
    port: 443,
    database: {
      name: 'mongodb://localhost/flerse'
    },
    'storage': {
      'login': '',
      'password': '',
      'container': ''
    },
    secret: 'Some Super-Secret Keyword. I haven\'t decided yet what.'
  },
  default: {

    port: 3000,
    database: {
      name: 'mongodb://localhost/flerse_dev_1'
    },
    'storage': {
      'login': '',
      'password': '',
      'container': ''
    },
    secret: 'Some Super-Secret Keyword. I haven\'t decided yet what.'
  }
};

module.exports = config[process.env.NODE_ENV || 'default'];
