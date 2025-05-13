const booksService = require("./service");
const authGuard = require("../auth/guard");
const { validationHandler, body, params } = require("../common");
const multer = require("multer");
const { randomUUID } = require("crypto");
const { join, extname } = require("path");


const createBooksHandler = async (req, res) => {
    const results = await booksService.createBooks(req.body.items);
    res.status(201).send({ results });
};

exports.createBooks = [
    ...authGuard(["ADMIN"]),
    validationHandler([body(require("./schema/create-books"))]),
    createBooksHandler
];

const getBookHandler = async (req, res) => {

    const book = await booksService.getBookBy({
        id: BigInt(req.params.bookId),
        userId: req.user ? req.user.id : undefined
    });

    res.status(200).send(book);
};

exports.getBook = [
    ...authGuard(["NONE", "USER", "ADMIN"]),
    validationHandler([params(require("./schema/get-book"))]),
    getBookHandler
];

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const body = req.body;
            let error = null;

            if (!body.imagesDirname) {
                const dirname = randomUUID()
                    .replaceAll('-', '');

                fs.mkdir(join(PUBLIC_DIR, "books", dirname), (err) => {
                    if (err) error = err;
                });

                body.imagesDirname = dirname;
            }

            cb(error, join(PUBLIC_DIR, "books", body.imagesDirname));
        },
        filename: (req, file, cb) => {
            const body = req.body;

            if (!Object.hasOwn(body, "nImages"))
                body.nImages = 0;

            cb(null, `${body.nImages++}${extname(file.originalname)}`);
        }
    })
});



const updateBookHandler = async (req, res) => {
    const body = req.body;




};







