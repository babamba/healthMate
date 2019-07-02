import multer from "multer";
import sftpStorage from "multer-sftp";
// import multerS3 from "multer-s3";
// import aws from "aws-sdk";

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_KEY,
//   secretAccessKey: process.env.AWS_SECRET,
//   region: "us-east-2"
// });

const upload = multer({
  storage: sftpStorage({
    sftp: {
      host: process.env.IMG_SERVER_HOST,
      port: process.env.IMG_SERVER_PORT,
      username: process.env.IMG_SERVER_USER,
      password: process.env.IMG_SERVER_PW
    },
    destination: function(req, file, cb) {
      cb(null, process.env.IMG_URL);
    },
    filename: function(req, file, cb) {
      console.log(file);
      cb(null, file.fieldname + Date.now().toString() + file.originalname);
    }
    // metadata: function(req, file, cb) {
    //   cb(null, { fieldName: file.fieldname });
    // },
    // key: function(req, file, cb) {
    //   cb(null, Date.now().toString());
    // }
  })
  // storage: multerS3({
  //   s3,
  //   acl: "public-read",
  //   bucket: "prisma.healthmate",
  //   metadata: function(req, file, cb) {
  //     cb(null, { fieldName: file.fieldname });
  //   },
  //   key: function(req, file, cb) {
  //     cb(null, Date.now().toString());
  //   }
  // })
});

export const uploadMiddleware = upload.single("file");

const PORT = process.env.PORT || 4000;

export const uploadController = (req, res) => {
  const {
    file: { filename }
  } = req;

  res.json({ location: process.env.IMG_SERVER + filename });
};
