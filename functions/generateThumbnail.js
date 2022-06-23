/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const Storage = require("@google-cloud/storage");
const sharp = require("sharp");

exports.createThumb = async (event, context) => {
  const gcs = new Storage();

  const fileBucket = event.bucket;
  const fileName = event.name;
  const contentType = event.contentType;

  if (!contentType.startsWith("image/")) {
    console.log("This is not an image.");
    return;
  }

  if (fileName.startsWith("thumb/")) {
    console.log("Already a Thumbnail.");
    return;
  }

  const bucket = gcs.bucket(fileBucket);

  const metadata = {
    contentType: contentType,
  };

  const thumbFileName = `thumb_${fileName}`;

  const result = await Promise.all([
    new Promise((resolve, reject) => {
      bucket
        .file(fileName)
        .createReadStream()
        .pipe(sharp().resize(320))
        .pipe(
          bucket
            .file(`thumb/s/${thumbFileName}`)
            .createWriteStream({ metadata })
        )
        .on("finish", () => resolve("성공입니다!"))
        .on("error", () => reject("에러입니다!"));
    }),
    new Promise((resolve, reject) => {
      bucket
        .file(fileName)
        .createReadStream()
        .pipe(sharp().resize(640))
        .pipe(
          bucket
            .file(`thumb/m/${thumbFileName}`)
            .createWriteStream({ metadata })
        )
        .on("finish", () => resolve("성공입니다!"))
        .on("error", () => reject("에러입니다!"));
    }),
    new Promise((resolve, reject) => {
      bucket
        .file(fileName)
        .createReadStream()
        .pipe(sharp().resize(1280))
        .pipe(
          bucket
            .file(`thumb/l/${thumbFileName}`)
            .createWriteStream({ metadata })
        )
        .on("finish", () => resolve("성공입니다!"))
        .on("error", () => reject("에러입니다!"));
    }),
  ]);

  return result;
};
