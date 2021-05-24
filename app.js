const app = require('./src/config/express');

const port = app.get('port');

if (process.env.NODE_ENV !== 'test') {

  app.listen(port, () => console.info(
    `Application currently running on port: ${port} for ${process.env.NODE_ENV}`,
  )
  );
}

module.exports = app;