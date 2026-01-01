
import multer from "multer"

//Multer = Node.js / Express වල file upload handle කරන middleware එකක්

// can disk or memory
// we choees memory
const storage = multer.memoryStorage()

export const upload = multer({ storage }) // storage: storage
