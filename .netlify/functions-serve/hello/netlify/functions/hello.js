// netlify/functions/hello.cjs
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: "Hello from Netlify Function (CommonJS)!" })
  };
};
//# sourceMappingURL=hello.js.map
