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

  //  Mark as processed immediately so rapid edits don't trigger duplicates
  const { error: insertError } = await supabase
    .from("processed_jobs")
    .insert([{ message_id: messageId, channel_id: channelId }]);

  if (insertError)
    return console.error("Database insert error:", insertError.message);

  console.log(
    `new job registered successfully. Moving to keyword matching logic...`,
  );
  // 1. Clean the text (lowercase, remove punctuation, fix spaces)
  let normalizedText = rawText.toLowerCase();
  normalizedText = normalizedText.replace(/[-/.,!]/g, " ").replace(/\s+/g, " ");

  // 2. Define workplace keyword arrays
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

  // 3. Check which keywords match
  const isRemote = remoteKeywords.some((k) => normalizedText.includes(k));
  const isOnsite = onsiteKeywords.some((k) => normalizedText.includes(k));
  const isHybrid = hybridKeywords.some((k) => normalizedText.includes(k));

  const matchedWorkplaces: string[] = [];
  if (isRemote) matchedWorkplaces.push("remote");
  if (isOnsite) matchedWorkplaces.push("onsite");
  if (isHybrid) matchedWorkplaces.push("hybrid");

  // If no workplace keywords match, skip the post completely
  if (matchedWorkplaces.length === 0) {
    console.log(
      `⏭️ Job ${messageId} ignored: No workplace type (remote/onsite/hybrid) found.`,
    );
    return;
  }

  //  TECHNICAL VALIDATION (Skills & Roles)

  const techKeywords = [
    "node",
    "javascript",
    "typescript",
    "go",
    "golang",
    "postgres",
    "backend",
    "fullstack",
    "react",
  ];
  const roleKeywords = [
    "developer",
    "engineer",
    "intern",
    "junior",
    "senior",
    "dev",
  ];

  const hasTech = techKeywords.some((k) => normalizedText.includes(k));
  const hasRole = roleKeywords.some((k) => normalizedText.includes(k));

  // If it doesn't mention a dev tech AND a dev role, skip it (filters out spam or non-tech jobs)
  if (!hasTech || !hasRole) {
    console.log(
      `⏭️ Job ${messageId} ignored: Not a relevant software development post.`,
    );
    return;
  }

  console.log(
    `Valid Software Job Found! Workplace Categories: ${matchedWorkplaces.join(", ")}`,
  );
};
