import { JSONFilePreset } from "lowdb/node"
// Read or create db.json
interface Post {
  id: string
  title: string
  content: string
}

interface Database {
  posts: Post[]
}

const defaultData: Database = { posts: [] }
const db = await JSONFilePreset('db.json', defaultData)

export default db



