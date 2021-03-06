'use strict'

import rdb from 'rethinkdb'
import rdbConnection from 'core/database/rethinkdb/connection'

export default async (io) => {
  try {
    // Get the db connection.
    const connection = await rdbConnection()

    // Subscribe to user table's changefeed.
    var cursor = await rdb.table('user')
      .changes()
      .run(connection)

    cursor.each(function (err, row) {
      if (err) {
        throw err
      }
      console.log(JSON.stringify(row, null, 2))
      io.emit('users.changefeeds', row)
    })

  } catch( err ) {
    console.error(err);
  }
}
