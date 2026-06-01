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

  if (fetchError)
    return console.error("Database fetch error:", fetchError.message);
  if (existingJob)
    return console.log(
      ` Job ${messageId} from channel ${channelId} already processed. Skipping.`,
    );

  const { error: insertError } = await supabase
    .from("processed_jobs")
    .insert([{ message_id: messageId, channel_id: channelId }]);

  if (insertError)
    return console.error("Database insert error:", insertError.message);

  console.log(
    `new job registered successfully. Moving to keyword matching logic...`,
  );
  let normalizedText = rawText.toLowerCase();
  normalizedText = normalizedText.replace(/[-/.,!]/g, " ").replace(/\s+/g, " ");

  const remoteKeywords = [
    "remote",
    "wfh",
    "work from home",
    "anywhere",
    "fully-remote",
  ];
  const onsiteKeywords = [
    "onsite",
    "on site",
    "office",
    "in-office",
    "in-person",
  ];
  const hybridKeywords = ["hybrid", "partially remote", "flexible arrangement"];

  const isRemote = remoteKeywords.some((k) => normalizedText.includes(k));
  const isOnsite = onsiteKeywords.some((k) => normalizedText.includes(k));
  const isHybrid = hybridKeywords.some((k) => normalizedText.includes(k));

  const matchedWorkplaces: string[] = [];
  if (isRemote) matchedWorkplaces.push("remote");
  if (isOnsite) matchedWorkplaces.push("onsite");
  if (isHybrid) matchedWorkplaces.push("hybrid");

  if (matchedWorkplaces.length === 0) {
    console.log(
      `Job ${messageId} ignored: No workplace type (remote/onsite/hybrid) found.`,
    );
    return;
  }

  console.log(
    `Valid Job Found! Workplace Categories: ${matchedWorkplaces.join(", ")}`,
  );
};
