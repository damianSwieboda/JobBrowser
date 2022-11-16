const jwt = require('jsonwebtoken')

const auth = () => {
    const encoded = jwt.verify(req.token, process.env.JWT_SECRET)
}

'0dfac7cf8b00e50b7abdde0c244e826aadf427272ffd8b4dcff6aa34562dd88f223f39f479f354a92c9624656b18394e4b862c25d307d27b6f1ddb0171ed448e'