export const GEN_INVALIDY_BODY: messageType = {
  id: "001",
  errorCode: 400,
  message: "Invalid data",
};

export const GEN_INTERNAL_SERVER_ERROR: messageType = {
  id: "002",
  errorCode: 500,
  message: "Ops! Something went wrong...",
};

export const GEN_INVALID_CREDENTIALS: messageType = {
  id: "003",
  errorCode: 406,
  message: "Invalid credentials!",
};

export const GEN_UNAUTHORIZED: messageType = {
  id: "004",
  errorCode: 406,
  message: "Unauthorized!",
};

// MESSAGE UTILS
export type messageType = {
  id: string;
  errorCode: number;
  message: string;
};

export function getMessage(
  messageObj: messageType,
  params: string[],
  isError = false,
) {
  const template = messageObj.message;

  let message = template.replace(/{(\d+)}/g, (match, index) => {
    return typeof params[index] !== "undefined" ? params[index] : match;
  });

  if (isError) {
    message = `${messageObj.id}: ${message}`;
  }

  return {
    message,
    statusCode: messageObj.errorCode,
  };
}
