import messages from "./messages.json";

const TranslateMessage = (code: string) => {
  const messagesT: any = messages;
  return messagesT[code];
};
export default TranslateMessage;
