const { get: getTraining } = require("../../services/training");
const { Training } = require("../../models/training");
const services = require("../../services/results");
const { Result } = require("../../models/result");
const { Book } = require("../../models/book");

const updateResult = async (req, res) => {
  const { body, user } = req;
  const data = await services.add(body);
  const training = await getTraining(user._id);
  const updatedTraining = await Training.findByIdAndUpdate(
    training._id,
    {
      results: [...training.results, data._id],
    },
    { new: true }
  ).populate("results");

  const books = await Book.find({ _id: training.books });

  const totalPages = training.books.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  const addedPages = updatedTraining.results.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  let isBookRead = false;
  let amount = 0;
  for (const book of books) {
    amount += book.pages;
    if (addedPages >= amount) {
      if (book.status === "read") {
        isBookRead = false;
        continue;
      } else {
        await Book.findByIdAndUpdate({ _id: book._id }, { status: "read" });
        isBookRead = true;
      }
    } else {
      break;
    }
  }

  if (addedPages >= totalPages || training.end < new Date()) {
    await Result.deleteMany({ _id: { $in: updatedTraining.results } });
    await Training.findByIdAndRemove(training._id);

    res.status(201).send({
      message: "Data was removed",
      data: [],
      total: 0,
      added: 0,
      start: null,
      end: null,
      finish: true,
      isBookRead,
    });
  } else {
    res.status(201).json({
      data: updatedTraining.results,
      total: totalPages,
      added: addedPages,
      start: training.start,
      end: training.end,
      finish: false,
      isBookRead,
    });
  }
};

module.exports = updateResult;
