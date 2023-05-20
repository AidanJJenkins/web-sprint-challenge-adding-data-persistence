// build your `Resource` model here
const db = require ('../../data/dbConfig')

module.exports = {
    get,
    findById,
    create
}

function get() {
  return db('resources')
}

async function findById(id) {
  return db('resources').where('resource_id', id).first()
}


async function create(resource) {
  try {
    const existingResource = await db('resources').where('resource_name', resource.resource_name).first()

    if (existingResource) {
      const error = new Error('Resource with the same name already exists')
      error.statusCode = 409
      throw error
    }

    const [id] = await db('resources').insert(resource)
    return await findById(id)
  } catch (err) {
    console.log(err)
    throw err
  }
}

