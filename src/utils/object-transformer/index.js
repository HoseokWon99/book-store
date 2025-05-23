const obj = {  };
const { userId, ...rest } = obj;
console.log(userId, rest);