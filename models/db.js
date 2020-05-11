const connectionString = require('../config/keys').connectionString;

const { Pool } = require('pg');

// const isProduction = (config.NODE_ENV === "production");

const pool = new Pool({ connectionString });

const logQuery = (text, params, start) => {
  let timeStamp = new Date();
  let formattedtimeStamp = timeStamp.toString().substring(4, 24);

  console.log({
    formattedtimeStamp,
    text,
    params
  });
};


module.exports = {
  async query(sql_template_query) {
    const start = Date.now();
    // logQuery(sql_template_query.text, 
    //   sql_template_query.values, start);
    // try {
    console.log(sql_template_query);

    let res = await pool.query(sql_template_query);
    
    logQuery(sql_template_query.text,
      sql_template_query.values);
    const duration = Date.now() - start;

    console.log("Previous query took: ", duration, "ms");
    return res;
  }
  // getClient: (callback) => {
  //   pool.connect((err, client, done) => {
  //     const query = client.query
  //     // monkey patch the query method to keep track of the last query executed
  //     client.query = (...args) => {
  //       client.lastQuery = args
  //       return query.apply(client, args)
  //     }
  //     // set a timeout of 5 seconds, after which we will log this client's last query
  //     const timeout = setTimeout(() => {
  //       console.error('A client has been checked out for more than 5 seconds!')
  //       console.error(`The last executed query on this client was: ${client.lastQuery}`)
  //     }, 5000)
  //     const release = (err) => {
  //       // call the actual 'done' method, returning this client to the pool
  //       done(err)
  //       // clear our timeout
  //       clearTimeout(timeout)
  //       // set the query method back to its old un-monkey-patched version
  //       client.query = query
  //     }
  //     callback(err, client, release)
  //   })
  // }
}