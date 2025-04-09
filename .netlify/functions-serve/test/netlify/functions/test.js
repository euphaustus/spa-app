// netlify/functions/test.cjs
exports.handler = async (event, context) => {
  console.log("Test function triggered!");
  console.log("Event:", event);
  console.log("Context:", context);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from test function!" })
  };
};
//# sourceMappingURL=test.js.map
