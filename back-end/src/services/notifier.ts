import { supabase } from "../utils/supabase";
interface IncomingJobPayload {
  messageId: string;
  channelId: string;
  rawText: string;
}
export const handleIncomingJob = async (payload: IncomingJobPayload) => {
  const { messageId, channelId, rawText } = payload;
  //  Check if this exact message from this channel was already processed
  const { data: existingJob, error: fetchError } = await supabase
    .from("processed_jobs")
    .select("id")
    .eq("message_id", messageId)
    .eq("channel_id", channelId)
    .maybeSingle();
};
