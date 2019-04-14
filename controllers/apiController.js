const path = require('path');
const Location = require(path.join("..", "models", "locations"))

exports.locations = async (req, res) => {
  try {
    let list_locations = await Location.find().sort([['type', 'ascending']]).exec();

    // Filter out locations that are stored in other locations
    let filterids = [];
    list_locations.forEach(location => filterids.push(location.locations));
    filterids = [].concat.apply([], filterids);
    list_locations = list_locations.filter(location => !filterids.includes(location._id.toString()));

    res.json(list_locations);
  } catch (error) {
    res.status(500).send(error);
  }
}
