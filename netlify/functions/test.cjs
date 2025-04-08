// netlify/functions/test.cjs
exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello from test function!' }),
    };
  };