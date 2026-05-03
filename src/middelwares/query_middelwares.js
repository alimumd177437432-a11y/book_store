export const addMiddelware = (model) => {
  return (req, res, next) => {
    const adding = model.create(req.body);
    req.Query = adding
    next();
  };
}; 
export const getMiddelware = (model) => {
  return (req, res, next) => {
    const got = model.find();
    req.Query = got
    next();
  };
}; 
export const putMiddelware = (model) => {
  return (req, res, next) => {
    const put = model.updateMany({},req.body);
    req.Query = put
    next();
  };
}; 
export const deleteMiddelware = (model) => {
  return (req, res, next) => {
    const deleted = model.deleteMany({},req.body);
    req.Query = deleted
    next();
  };
}; 
