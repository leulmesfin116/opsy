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

  //
  if (fetchError)
    return console.error("Database fetch error:", fetchError.message);
  if (existingJob)
    return console.log(
      `⏭️ Job ${messageId} from channel ${channelId} already processed. Skipping.`,
    );

  //  Mark as processed immediately so rapid edits don't trigger duplicates
  const { error: insertError } = await supabase
    .from("processed_jobs")
    .insert([{ message_id: messageId, channel_id: channelId }]);

  if (insertError)
    return console.error("Database insert error:", insertError.message);

  console.log(
    `ew job registered successfully. Moving to keyword matching logic...`,
  );
};
