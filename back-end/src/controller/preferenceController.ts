import { Request, Response } from "express";
import { supabase } from "../utils/supabase";

export const preference = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      username,
      careerPreference,
      workPreference,
      jobLocationPreference,
      keywords,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const payload = {
      user_id: userId,
      username: username || null,
      career_preference: careerPreference || null,
      work_preference: workPreference || null,
      job_location_preference: jobLocationPreference || null,
      keywords: keywords || null,
      updated_at: new Date().toISOString(),
    };

    // registering a user
    
    const { data, error } = await supabase
      .from("user_preferences")
      .upsert(payload, { onConflict: "user_id" })
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        message: "Failed to save user preferences",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ message: "Preferences saved successfully", data });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
