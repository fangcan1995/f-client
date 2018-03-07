// 文件转DataURL
const readBlobAsDataURL = blob => new Promise((resolve, reject) => {
  let reader = new FileReader();
  let handleSuccess = function(e) {
    reader.removeEventListener('load', handleSuccess);
    reader.removeEventListener('error', handleFail);
    resolve(this.result);
  }
  let handleFail = function(e) {
    reader.removeEventListener('load', handleSuccess);
    reader.removeEventListener('error', handleFail);
    reject(this.result);
  }
  handleSuccess = handleSuccess.bind(reader);
  handleFail = handleFail.bind(reader);
  reader.addEventListener('load', handleSuccess);
  reader.addEventListener('error', handleFail);
  reader.readAsDataURL(blob);
});

export default readBlobAsDataURL;