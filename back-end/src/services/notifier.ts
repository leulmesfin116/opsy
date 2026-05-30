import { supabase } from "../utils/supabase";
interface IncomingJobPayload {
  messageId: string;
  channelId: string;
  rawText: string;
}
export const handleIncomingJob = async (payload: IncomingJobPayload) => {
  const { messageId, channelId, rawText } = payload;
};
