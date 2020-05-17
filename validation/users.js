
module.exports = {
  getUserIDFromReq(req) {
    return req.user && req.user.id;
  }
}