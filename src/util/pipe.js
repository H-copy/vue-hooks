

const pipe = (...fns) => arg => fns.reduce((acc, fn) => fn(acc), arg)

export default pipe