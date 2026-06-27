const ProtectCashingWare = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  // 2. Only cache GET requests
  if (req.method !== 'GET') {
    return next()
  }
}

module.exports = ProtectCashingWare
