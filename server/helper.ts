export {}
function initialiseENV(){
  require('dotenv').config()
}

const promisifyFun = (fn:any, ...args:any[]) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err:any, data:any) => {
      if (err) {
          console.log('error from helper', err)
        return reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = { promisifyFun,initialiseENV };
