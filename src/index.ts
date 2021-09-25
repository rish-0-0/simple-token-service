import app from './app';

(async () => {
  const server = await app();

  server.listen(
    process.env.PORT || 4321,
    '0.0.0.0',
    (err, addr) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Listening on ${addr}`);
    }
  );
})();
