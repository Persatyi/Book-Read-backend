const { get: getTraining } = require("../../services/training");

const getResults = async (req, res) => {
  const { user } = req;
  const training = await getTraining(user._id);

  if (Object.keys(training).length === 0) {
    res.status(200).send({
      message: "No training yet",
      data: [],
      total: 0,
      added: 0,
      start: null,
      end: null,
      finish: false,
      isBookRead: false,
    });
  }

  const arrayOfResults = training.results;

  const totalPages = training.books.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  const addedPages = arrayOfResults.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  if (!arrayOfResults) {
    return res.status(200).json({
      message: "there is no data in this collection yet",
      data: [],
      total: 0,
      added: 0,
      start: null,
      end: null,
    });
  }

  const response = {
    data: arrayOfResults,
    total: totalPages,
    added: addedPages,
    start: training.start,
    end: training.end,
  };

  res.status(200).json(response);
};

module.exports = getResults;
