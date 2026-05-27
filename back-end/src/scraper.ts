import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import { NewMessageEvent } from "telegram/events/NewMessage";
import { Message } from "telegram/tl/custom/message";
import { supabase } from "./supabase"; // The client we created yesterday
